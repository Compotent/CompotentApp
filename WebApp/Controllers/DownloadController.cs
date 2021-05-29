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
                    image.Crop(new MagickGeometry((int)(0.01 * data.left * image.Width),
                                                  (int)(0.01 * data.top * image.Height),
                                                  (int)(image.Width * (1 - 0.01 * data.right - 0.01 * data.left)), 
                                                  (int)(image.Height* (1 - 0.01 * data.bottom - 0.01 * data.top)) ) );
                    
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
                    image.Modulate(new Percentage(data.brightness*0.8), new Percentage(data.saturate)); 

                    //Размытие
                    image.GaussianBlur(data.blur*1.6, data.blur);

                    //Добавление текста
                    MagickReadSettings readSettings = new MagickReadSettings{
                    FillColor = MagickColors.Blue, // цвет текста
                    BackgroundColor = MagickColors.Transparent, // фон текста
                    Font = "Arial", // Шрифт текста (только те, что установлены в Windows)
                    Width = 350, // Ширина текста
                    Height = 48 }; // Высота текста
                image.Alpha(AlphaOption.Opaque);
                using (MagickImage label = new MagickImage("label:Тут какой то текст", readSettings)){
                    image.Composite(label, 200, 100, CompositeOperator.Over); // расположение текста на картинке 200 слева, 100 сверху
                    //image.Write(image);
                    }
                    

                    b = image.ToByteArray();
                }

            }
            return File(b, "image/jpeg", "download.jpg");
        }
    }
}
