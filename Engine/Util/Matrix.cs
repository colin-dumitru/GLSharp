// Matrix.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Util {
    public class Matrix4X4 {
        private float[] _elements;

        public float[] Elements {
            get { return _elements; }
            set { _elements = value; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4(float[] elements) {
            this._elements = (elements == null) ? SystemCore.Environment.CreateFloat32Array(16) :
                SystemCore.Environment.CreateFloat32ArrayFromArray(elements);
        }
    }
}
