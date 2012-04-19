// Matrix.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Util {
    public class Matrix4X4 {

        private static Matrix4X4 _identity = null;
        public static Matrix4X4 Identity {
            get {
                return _identity ?? (_identity = new Matrix4X4(new float[] {
                    1.0f, 0.0f, 0.0f, 0.0f,
                    0.0f, 1.0f, 0.0f, 0.0f,
                    0.0f, 0.0f, 1.0f, 0.0f,
                    0.0f, 0.0f, 0.0f, 1.0f
                }));
            }
        }

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
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 MultiplyM(Matrix4X4 other) {
            float[] newe = SystemCore.Environment.CreateFloat32Array(16);

            newe[0] = this._elements[0] * other._elements[0] + this._elements[4] * other._elements[1] +
                this._elements[8] * other._elements[2] + this._elements[12] * other._elements[3];
            newe[1] = this._elements[1] * other._elements[0] + this._elements[5] * other._elements[1] +
                this._elements[9] * other._elements[2] + this._elements[13] * other._elements[3];
            newe[2] = this._elements[2] * other._elements[0] + this._elements[6] * other._elements[1] +
                this._elements[10] * other._elements[2] + this._elements[14] * other._elements[3];
            newe[3] = this._elements[3] * other._elements[0] + this._elements[7] * other._elements[1] +
                this._elements[11] * other._elements[2] + this._elements[15] * other._elements[3];
            newe[4] = this._elements[0] * other._elements[4] + this._elements[4] * other._elements[5] +
                this._elements[8] * other._elements[6] + this._elements[12] * other._elements[7];
            newe[5] = this._elements[1] * other._elements[4] + this._elements[5] * other._elements[5] +
                this._elements[9] * other._elements[6] + this._elements[13] * other._elements[7];
            newe[6] = this._elements[2] * other._elements[4] + this._elements[6] * other._elements[5] +
                this._elements[10] * other._elements[6] + this._elements[14] * other._elements[7];
            newe[7] = this._elements[3] * other._elements[4] + this._elements[7] * other._elements[5] +
                this._elements[11] * other._elements[6] + this._elements[15] * other._elements[7];
            newe[8] = this._elements[0] * other._elements[8] + this._elements[4] * other._elements[9] +
                this._elements[8] * other._elements[10] + this._elements[12] * other._elements[11];
            newe[9] = this._elements[1] * other._elements[8] + this._elements[5] * other._elements[9] +
                this._elements[9] * other._elements[10] + this._elements[13] * other._elements[11];
            newe[10] = this._elements[2] * other._elements[8] + this._elements[6] * other._elements[9] +
                this._elements[10] * other._elements[10] + this._elements[14] * other._elements[11];
            newe[11] = this._elements[3] * other._elements[8] + this._elements[7] * other._elements[9] +
                this._elements[11] * other._elements[10] + this._elements[15] * other._elements[11];
            newe[12] = this._elements[0] * other._elements[12] + this._elements[4] * other._elements[13] +
                this._elements[8] * other._elements[14] + this._elements[12] * other._elements[15];
            newe[13] = this._elements[1] * other._elements[12] + this._elements[5] * other._elements[13] +
                this._elements[9] * other._elements[14] + this._elements[13] * other._elements[15];
            newe[14] = this._elements[2] * other._elements[12] + this._elements[6] * other._elements[13] +
                this._elements[10] * other._elements[14] + this._elements[14] * other._elements[15];
            newe[15] = this._elements[3] * other._elements[12] + this._elements[7] * other._elements[13] +
                this._elements[11] * other._elements[14] + this._elements[15] * other._elements[15];

            this._elements = newe;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 MultiplyAffineM(Matrix4X4 other) {
            float[] newe = SystemCore.Environment.CreateFloat32Array(16);

            newe[0] = this._elements[0] * other._elements[0] + this._elements[4] * other._elements[1] +
                this._elements[8] * other._elements[2];
            newe[1] = this._elements[1] * other._elements[0] + this._elements[5] * other._elements[1] +
                this._elements[9] * other._elements[2];
            newe[2] = this._elements[2] * other._elements[0] + this._elements[6] * other._elements[1] +
                this._elements[10] * other._elements[2];
            newe[3] = 0;
            newe[4] = this._elements[0] * other._elements[4] + this._elements[4] * other._elements[5] +
                this._elements[8] * other._elements[6];
            newe[5] = this._elements[1] * other._elements[4] + this._elements[5] * other._elements[5] +
                this._elements[9] * other._elements[6];
            newe[6] = this._elements[2] * other._elements[4] + this._elements[6] * other._elements[5] +
                this._elements[10] * other._elements[6];
            newe[7] = 0;
            newe[8] = this._elements[0] * other._elements[8] + this._elements[4] * other._elements[9] +
                this._elements[8] * other._elements[10];
            newe[9] = this._elements[1] * other._elements[8] + this._elements[5] * other._elements[9] +
                this._elements[9] * other._elements[10];
            newe[10] = this._elements[2] * other._elements[8] + this._elements[6] * other._elements[9] +
                this._elements[10] * other._elements[10];
            newe[11] = 0;
            newe[12] = this._elements[0] * other._elements[12] + this._elements[4] * other._elements[13] +
                this._elements[8] * other._elements[14] + this._elements[12];
            newe[13] = this._elements[1] * other._elements[12] + this._elements[5] * other._elements[13] +
                this._elements[9] * other._elements[14] + this._elements[13];
            newe[14] = this._elements[2] * other._elements[12] + this._elements[6] * other._elements[13] +
                this._elements[10] * other._elements[14] + this._elements[14];
            newe[15] = 1;

            this._elements = newe;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Rotate(float angle, Vector3 axis) {
            float c = Math.Cos(angle);
            float c1 = 1 - c;
            float s = Math.Cos(angle);
            float xs = axis._elements[0] * s;
            float ys = axis._elements[1] * s;
            float zs = axis._elements[2] * s;
            float xyc1 = axis._elements[0] * axis._elements[1] * c1;
            float xzc1 = axis._elements[0] * axis._elements[2] * c1;
            float yzc1 = axis._elements[1] * axis._elements[2] * c1;

            float t11 = axis._elements[0] * axis._elements[0] * c1 + c;
            float t21 = xyc1 + zs;
            float t31 = xzc1 - ys;
            float t12 = xyc1 - zs;
            float t22 = axis._elements[1] * axis._elements[1] * c1 + c;
            float t32 = yzc1 + xs;
            float t13 = xzc1 + ys;
            float t23 = yzc1 - xs;
            float t33 = axis._elements[2] * axis._elements[2] * c1 + c;

            Matrix4X4 aux = new Matrix4X4(null);

            aux._elements[0] = this._elements[0] * t11 + this._elements[4] * t21 + this._elements[8] * t31;
            aux._elements[1] = this._elements[1] * t11 + this._elements[5] * t21 + this._elements[9] * t31;
            aux._elements[2] = this._elements[2] * t11 + this._elements[6] * t21 + this._elements[10] * t31;
            aux._elements[3] = this._elements[3] * t11 + this._elements[7] * t21 + this._elements[11] * t31;
            aux._elements[4] = this._elements[0] * t12 + this._elements[4] * t22 + this._elements[8] * t32;
            aux._elements[5] = this._elements[1] * t12 + this._elements[5] * t22 + this._elements[9] * t32;
            aux._elements[6] = this._elements[2] * t12 + this._elements[6] * t22 + this._elements[10] * t32;
            aux._elements[7] = this._elements[3] * t12 + this._elements[7] * t22 + this._elements[11] * t32;
            aux._elements[8] = this._elements[0] * t13 + this._elements[4] * t23 + this._elements[8] * t33;
            aux._elements[9] = this._elements[1] * t13 + this._elements[5] * t23 + this._elements[9] * t33;
            aux._elements[10] = this._elements[2] * t13 + this._elements[6] * t23 + this._elements[10] * t33;
            aux._elements[11] = this._elements[3] * t13 + this._elements[7] * t23 + this._elements[11] * t33;

            this._elements = aux._elements;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Scale(Vector3 scale) {
            this._elements[0] = this._elements[0] * scale._elements[0];
            this._elements[1] = this._elements[1] * scale._elements[0];
            this._elements[2] = this._elements[2] * scale._elements[0];
            this._elements[3] = this._elements[3] * scale._elements[0];
            this._elements[4] = this._elements[4] * scale._elements[1];
            this._elements[5] = this._elements[5] * scale._elements[1];
            this._elements[6] = this._elements[6] * scale._elements[1];
            this._elements[7] = this._elements[7] * scale._elements[1];
            this._elements[8] = this._elements[8] * scale._elements[2];
            this._elements[9] = this._elements[9] * scale._elements[2];
            this._elements[10] = this._elements[10] * scale._elements[2];
            this._elements[11] = this._elements[11] * scale._elements[2]; 
            this._elements[12] = this._elements[12];
            this._elements[13] = this._elements[13];
            this._elements[14] = this._elements[14];
            this._elements[15] = this._elements[15];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Translate(Vector3 distance) {
            this._elements[12] += this._elements[0] * distance._elements[0] + this._elements[4] * distance._elements[1] +
                this._elements[8] * distance._elements[2];
            this._elements[13] += this._elements[1] * distance._elements[0] + this._elements[5] * distance._elements[1] +
                this._elements[9] * distance._elements[2];
            this._elements[14] += this._elements[2] * distance._elements[0] + this._elements[6] * distance._elements[1] +
                this._elements[10] * distance._elements[2];
            this._elements[15] += this._elements[3] * distance._elements[0] + this._elements[7] * distance._elements[1] +
                this._elements[11] * distance._elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Transpose() {
            float tmp = this._elements[1]; this._elements[1] = this._elements[4]; this._elements[4] = tmp;
            tmp = this._elements[2]; this._elements[2] = this._elements[8]; this._elements[8] = tmp;
            tmp = this._elements[3]; this._elements[3] = this._elements[12]; this._elements[12] = tmp;
            tmp = this._elements[6]; this._elements[6] = this._elements[9]; this._elements[9] = tmp;
            tmp = this._elements[7]; this._elements[7] = this._elements[13]; this._elements[13] = tmp;
            tmp = this._elements[11]; this._elements[11] = this._elements[14]; this._elements[14] = tmp;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Clone() {
            return new Matrix4X4(this._elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakeFrustrum(float left, float right, float bottom, float top, float znear, float zfar) {
            Matrix4X4 ret = new Matrix4X4(null);

            ret._elements[0] = 2 * znear / (right - left);
            ret._elements[1] = 0;
            ret._elements[2] = 0;
            ret._elements[3] = 0;
            ret._elements[4] = 0;
            ret._elements[5] = 2 * znear / (top - bottom);
            ret._elements[6] = 0;
            ret._elements[7] = 0;
            ret._elements[8] = (right + left) / (right - left);
            ret._elements[9] = (top + bottom) / (top - bottom);
            ret._elements[10] = -(zfar + znear) / (zfar - znear);
            ret._elements[11] = -1;
            ret._elements[12] = 0;
            ret._elements[13] = 0;
            ret._elements[14] = -2 * zfar * znear / (zfar - znear);
            ret._elements[15] = 0;


            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakePerspective(float fov, float aspect, float znear, float zfar) {
            float ymax = znear * Math.Tan(fov * Math.PI / 360.0);
            float ymin = -ymax;
            float xmin = ymin * aspect;
            float xmax = ymax * aspect;

            return Matrix4X4.MakeFrustrum(xmin, xmax, ymin, ymax, znear, zfar);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakeOrtho(float left, float right, float bottom, float top, float znear, float zfar) {
            Matrix4X4 ret = new Matrix4X4(null);

            ret._elements[0] = 2 / (right - left);
            ret._elements[1] = 0;
            ret._elements[2] = 0;
            ret._elements[3] = 0;
            ret._elements[4] = 0;
            ret._elements[5] = 2 / (top - bottom);
            ret._elements[6] = 0;
            ret._elements[7] = 0;
            ret._elements[8] = 0;
            ret._elements[9] = 0;
            ret._elements[10] = -2 / (zfar - znear);
            ret._elements[11] = 0;
            ret._elements[12] = -(right + left) / (right - left);
            ret._elements[13] = -(top + bottom) / (top - bottom);
            ret._elements[14] = -(zfar + znear) / (zfar - znear);
            ret._elements[15] = 1;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakeLookAt(Vector3 eye, Vector3 center, Vector3 up) {
            Matrix4X4 ret = new Matrix4X4(null);

            Vector3 z = eye.Direction(center);
            Vector3 x = up.Clone().Cross(z).Normalize();
            Vector3 y = z.Clone().Cross(x).Normalize();

            ret._elements[0] = x._elements[0];
            ret._elements[1] = y._elements[0];
            ret._elements[2] = z._elements[0];
            ret._elements[3] = 0;
            ret._elements[4] = x._elements[1];
            ret._elements[5] = y._elements[1];
            ret._elements[6] = z._elements[1];
            ret._elements[7] = 0;
            ret._elements[8] = x._elements[2];
            ret._elements[9] = y._elements[2];
            ret._elements[10] = z._elements[2];
            ret._elements[11] = 0;
            ret._elements[12] = 0;
            ret._elements[13] = 0;
            ret._elements[14] = 0;
            ret._elements[15] = 1;

            Matrix4X4 tmp = new Matrix4X4(null);

            tmp._elements[0] = 1;
            tmp._elements[1] = 0; 
            tmp._elements[2] = 0; 
            tmp._elements[3] = 0;
            tmp._elements[4] = 0; 
            tmp._elements[5] = 1; 
            tmp._elements[6] = 0; 
            tmp._elements[7] = 0;
            tmp._elements[8] = 0; 
            tmp._elements[9] = 0; 
            tmp._elements[10] = 1; 
            tmp._elements[11] = 0;
            tmp._elements[12] = -eye._elements[0]; 
            tmp._elements[13] = -eye._elements[1]; 
            tmp._elements[14] = -eye._elements[2]; 
            tmp._elements[15] = 1;

            return ret.MultiplyAffineM(tmp);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

    }
}
