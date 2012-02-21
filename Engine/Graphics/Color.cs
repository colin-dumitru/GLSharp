using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace GLSharp.Graphics {
    public class Color {
        private float _red = 0.0f;
        private float _green = 0.0f;
        private float _blue = 0.0f;
        private float _alpha = 1.0f;

        public float Red { get { return this._red; } set { this._red = value; } }
        public float Green { get { return this._green; } set { this._green = value; } }
        public float Blue { get { return this._blue; } set { this._blue = value; } }
        public float Alpha { get { return this._alpha; } set { this._alpha = value; } }
        
        public Color() {            
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        public static Color Create(float red, float green, float blue, float alpha) {
            Color ret = new Color();

            ret.Red = red;
            ret.Green = green;
            ret.Blue = blue;
            ret.Alpha = alpha;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        
    }
}
