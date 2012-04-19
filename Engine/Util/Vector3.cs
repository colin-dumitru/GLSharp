// Vector3.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Util {
    public class Vector3 {
        protected internal float[] _elements;

        public float[] Elements {
            get { return _elements; }
            set { _elements = value; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3(float[] elements) {
            this._elements = (elements == null) ? SystemCore.Environment.CreateFloat32Array(3) :
                SystemCore.Environment.CreateFloat32ArrayFromArray(elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Add(Vector3 other) {
            this._elements[0] += other._elements[0];
            this._elements[1] += other._elements[1];
            this._elements[2] += other._elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Subtract(Vector3 other) {
            this._elements[0] -= other._elements[0];
            this._elements[1] -= other._elements[1];
            this._elements[2] -= other._elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Direction(Vector3 to) {
            return (this.Clone().Subtract(to).Normalize());
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public int Length() {
            return Math.Sqrt(_elements[0] * _elements[0] + _elements[1] * _elements[1] + _elements[2] * _elements[2]);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Normalize() {
            int len = 1 / this.Length();
            this._elements[0] *= len;
            this._elements[1] *= len;
            this._elements[2] *= len;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Scale(float val) {
            this._elements[0] *= val;
            this._elements[1] *= val;
            this._elements[2] *= val;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public float Dot(Vector3 other) {
            return this._elements[0] * other._elements[0] + this._elements[1] * other._elements[1] +
                this._elements[2] * other._elements[2];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Cross(Vector3 other) {
            Vector3 aux = new Vector3(null);

            aux._elements[0] = this._elements[1] * other._elements[2] - this._elements[2] * other._elements[1];
            aux._elements[1] = this._elements[2] * other._elements[0] - this._elements[0] * other._elements[2];
            aux._elements[2] = this._elements[0] * other._elements[1] - this._elements[1] * other._elements[0];

            this._elements = aux._elements;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Clone() {
            return new Vector3(this._elements);
        }
    }
}
