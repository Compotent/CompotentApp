using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ImageMagick;
using WebApp.Data;
using System.Net;
using System.IO;


namespace WebApp.Controllers
{
    public class DownloadController : Controller
    {
        private ImageDBContext db;

        public DownloadController(ImageDBContext context)
        {
            db = context;
        }

        [HttpPost]
        public IActionResult Index([FromBody] SettingData data)
        {
            Byte[] b;  
            byte[] imageBytes;
            if (data.image.Substring(0, 4) == "data")
            {
                var str = data.image.Split(',')[1];
                imageBytes = Convert.FromBase64String(str);
            }
            else
            {
                var webClient = new WebClient();
                imageBytes = webClient.DownloadData(data.image);
            }
                
            using (var image = new MagickImage(imageBytes))
            {
                //Фильтры
                if (data.sepia > 0)
                    image.SepiaTone();
                if (data.contrast < 100) data.contrast=-40;
                image.BrightnessContrast(new Percentage(0),new Percentage((data.contrast-100)/3)); 
                image.Modulate(new Percentage(data.brightness*0.8), new Percentage(data.saturate*0.9)); 

                //Размытие
                image.GaussianBlur(data.blur*1.8, data.blur);

                //Добавление текста
                if (data.text != "")
                {
                    MagickReadSettings readSettings = new MagickReadSettings{
                        FillColor = new MagickColor(data.textcolor), // цвет текста
                        BackgroundColor = MagickColors.Transparent, // фон текста
                        Font = "Georgia", // Шрифт текста (только те, что установлены в Windows)
                        FontPointsize = data.fontsize,
                    };
                    image.Alpha(AlphaOption.Opaque);
                    using (MagickImage label = new MagickImage($"label:{data.text}", readSettings))
                    {
                        image.Composite(label, (int)(data.text_x), (int)(data.text_y + 8), CompositeOperator.Over); // расположение текста на картинке
                    }
                };

                
                //Обрезка
                image.Crop(new MagickGeometry((int)(data.left),
                                                (int)(data.top),
                                                (int)(image.Width - (data.right + data.left)), 
                                                (int)(image.Height - (data.bottom + data.top))));
                
                //Поворот
                image.Rotate(data.rotate_z);
                if (data.rotate_x > 0)
                    image.Flip();
                if (data.rotate_y > 0)
                    image.Flop();

                b = image.ToByteArray();


                db.Add(data);
                db.SaveChanges();

                if (data.image_format == "png")
                    return File(b, "image/png", "download.png");
                return File(b, "image/jpeg", "download.jpg");
            }
        }
    }
}
