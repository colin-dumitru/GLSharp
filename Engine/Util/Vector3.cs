// Vector3.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Util {
    public class Vector3 {
        public float[] Elements;


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Vector3 Build(Vector3 other) {
            return new Vector3(other.Elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Vector3 Build3(float x, float y, float z) {
            Vector3 ret = new Vector3(null);

            ret.Elements[0] = x;
            ret.Elements[1] = y;
            ret.Elements[1] = z;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3(float[] elements) {
            this.Elements = (elements == null) ? SystemCore.Environment.CreateFloat32Array(3) :
                SystemCore.Environment.CreateFloat32ArrayFromArray(elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Set(Vector3 other) {
            this.Elements[0] = other.Elements[0];
            this.Elements[1] = other.Elements[1];
            this.Elements[2] = other.Elements[2];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Set3(float x, float y, float z) {
            this.Elements[0] = x;
            this.Elements[1] = y;
            this.Elements[2] = z;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Add(Vector3 other) {
            this.Elements[0] += other.Elements[0];
            this.Elements[1] += other.Elements[1];
            this.Elements[2] += other.Elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Add3(float x, float y, float z) {
            this.Elements[0] += x;
            this.Elements[1] += y;
            this.Elements[2] += z;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Subtract(Vector3 other) {
            this.Elements[0] -= other.Elements[0];
            this.Elements[1] -= other.Elements[1];
            this.Elements[2] -= other.Elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Subtract3(float x, float y, float z) {
            this.Elements[0] -= x;
            this.Elements[1] -= y;
            this.Elements[2] -= z;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Direction(Vector3 to) {
            return (this.Clone().Subtract(to).Normalize());
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public float Distance(Vector3 other) {
            return Math.Sqrt(
                (other.Elements[0] - Elements[0]) * (other.Elements[0] - Elements[0]) +
                (other.Elements[1] - Elements[1]) * (other.Elements[1] - Elements[1]) +
                (other.Elements[2] - Elements[2]) * (other.Elements[2] - Elements[2])
                );
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public float Distance3(float x, float y, float z) {
            return Math.Sqrt(
                (x - Elements[0]) * (x - Elements[0]) +
                (y - Elements[1]) * (y - Elements[1]) +
                (z - Elements[2]) * (z - Elements[2])
                );
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public int Length() {
            return Math.Sqrt(Elements[0] * Elements[0] + Elements[1] * Elements[1] + Elements[2] * Elements[2]);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Normalize() {
            int len = 1 / this.Length();
            this.Elements[0] *= len;
            this.Elements[1] *= len;
            this.Elements[2] *= len;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Scale(float val) {
            this.Elements[0] *= val;
            this.Elements[1] *= val;
            this.Elements[2] *= val;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public float Dot(Vector3 other) {
            return this.Elements[0] * other.Elements[0] + this.Elements[1] * other.Elements[1] +
                this.Elements[2] * other.Elements[2];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Cross(Vector3 other) {
            float x = Elements[0], y = Elements[1], z = Elements[2];
            float x2 = other.Elements[0], y2 = other.Elements[1], z2 = other.Elements[2];

            Elements[0] = y * z2 - z * y2;
            Elements[1] = z * x2 - x * z2;
            Elements[2] = x * y2 - y * x2;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void MultScalar(float scalar) {
            this.Elements[0] *= scalar;
            this.Elements[1] *= scalar;
            this.Elements[2] *= scalar;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void MultVect(Vector3 other) {
            this.Elements[0] *= other.Elements[0];
            this.Elements[1] *= other.Elements[1];
            this.Elements[2] *= other.Elements[2];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 Clone() {
            return new Vector3(this.Elements);
        }
    }
}
