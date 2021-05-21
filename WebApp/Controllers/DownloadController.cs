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
                    image.Crop(new MagickGeometry((int)(0.01 * data.left * image.Width),
                                                  (int)(0.01 * data.top * image.Height),
                                                  (int)(image.Width * (1 - 0.01 * data.right - 0.01 * data.left)), 
                                                  (int)(image.Height* (1 - 0.01 * data.bottom - 0.01 * data.top)) ) );
                    
                    image.GaussianBlur(data.blur, 15);
                    image.Rotate(data.rotate_z);
                    b = image.ToByteArray();
                }

                // Do something
            }
            return File(b, "image/jpeg", "download.jpg");
        }
    }
}
