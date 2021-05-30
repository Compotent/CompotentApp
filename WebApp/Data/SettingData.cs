using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Data
{
    public class SettingData
    {
        public string image_format { get; set; }
        public double brightness { get; set; }
        public double saturate { get; set; }
        public double contrast { get; set; }
        public int sepia { get; set; }
        public int rotate_x { get; set; }

        public int rotate_y { get; set; }
        public int rotate_z { get; set; }

        public int top { get; set; }
        public int right { get; set; }
        public int bottom { get; set; }
        public int left { get; set; }

        public double blur { get; set; }

        public string text { get; set; }
        public double fontsize { get; set; }
        public string textcolor { get; set; }
        public int text_x { get; set; }
        public int text_y { get; set; }

    }
}
