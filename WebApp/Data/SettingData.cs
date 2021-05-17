using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Data
{
    public class SettingData
    {
        public int brightness { get; set; }
        public int contrast { get; set; }
        public int sepia { get; set; }
        public int rotate_x { get; set; }

        public int rotate_y { get; set; }
        public int rotate_z { get; set; }

        public int top { get; set; }
        public int right { get; set; }
        public int bottom { get; set; }
        public int blur { get; set; }
    }
}
