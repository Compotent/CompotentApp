using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ImageMagick;
using WebApp.Data;

namespace WebApp.Controllers
{
    public class DownloadController : Controller
    {
        [HttpPost]
        public IActionResult Index([FromBody] SettingData data)
        {
            Byte[] b;  
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEnd();
                
                    
                using (var image = new MagickImage("https://www.hospital-mmk.ru/wp-content/uploads/2020/08/1785dff58a020e0fab4416747a9056f1.jpg"))
                {
                    //Обрезка
                    image.Crop(new MagickGeometry((int)(data.left*2),
                                                  (int)(data.top*2),
                                                  (int)(image.Width - data.right*2), 
                                                  (int)(image.Height - data.bottom*2)));
                    
                    //Поворот
                    image.Rotate(data.rotate_z);
                    if (data.rotate_x > 0)
                        image.Flip();
                    if (data.rotate_y > 0)
                        image.Flop();
                        
                    //Фильтры
                    if (data.sepia > 0)
                        image.SepiaTone();
                    if (data.contrast < 100) data.contrast=-40;
                    image.BrightnessContrast(new Percentage(0),new Percentage((data.contrast-100)/3)); 
                    image.Modulate(new Percentage(data.brightness*0.8), new Percentage(data.saturate*0.9)); 

                    //Размытие
                    image.GaussianBlur(data.blur*1.6, data.blur);

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
                            image.Composite(label, data.text_x, data.text_y + 8, CompositeOperator.Over); // расположение текста на картинке
                        }
                    }
                    b = image.ToByteArray();
                }
            }
            if (data.image_format == "png")
                return File(b, "image/png", "download.png");
            return File(b, "image/jpeg", "download.jpg");
        }
    }
}
