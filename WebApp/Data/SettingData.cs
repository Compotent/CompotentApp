using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Data
{
    public class SettingData
    {
        [Key]
        public Guid id { get; set; }
        public string image { get; set; }
        public string image_format { get; set; }
        public double brightness { get; set; }
        public double saturate { get; set; }
        public double contrast { get; set; }
        public double sepia { get; set; }
        public double rotate_x { get; set; }

        public double rotate_y { get; set; }
        public double rotate_z { get; set; }

        public double top { get; set; }
        public double right { get; set; }
        public double bottom { get; set; }
        public double left { get; set; }

        public double blur { get; set; }

        public string text { get; set; }
        public double fontsize { get; set; }
        public string textcolor { get; set; }
        public double text_x { get; set; }
        public double text_y { get; set; }

    }
}
