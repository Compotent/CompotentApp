using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Data
{
    public class SettingData
    {
        public int brightness { get; set; }
        public int saturate { get; set; }
        public int contrast { get; set; }
        public int sepia { get; set; }
        
        public int rotate_z { get; set; }
        public int top { get; set; }
        public int right { get; set; }
        public int bottom { get; set; }
        public int left { get; set; }
        public double blur { get; set; }
        public string format { get; set; }
        public string buffer { get; set; }
    }
}
