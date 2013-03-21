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

        public float[] Elements;
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4(float[] elements) {
            this.Elements = (elements == null)
                ? SystemCore.Environment.CreateFloat32Array(16)
                : SystemCore.Environment.CreateFloat32ArrayFromArray(elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 MultiplyM(Matrix4X4 other) {
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
            float a30 = Elements[12], a31 = Elements[13], a32 = Elements[14], a33 = Elements[15];

            float b00 = other.Elements[0], b01 = other.Elements[1], b02 = other.Elements[2], b03 = other.Elements[3];
            float b10 = other.Elements[4], b11 = other.Elements[5], b12 = other.Elements[6], b13 = other.Elements[7];
            float b20 = other.Elements[8], b21 = other.Elements[9], b22 = other.Elements[10], b23 = other.Elements[11];
            float b30 = other.Elements[12], b31 = other.Elements[13], b32 = other.Elements[14], b33 = other.Elements[15];

            Elements[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
            Elements[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
            Elements[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
            Elements[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
            Elements[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
            Elements[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
            Elements[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
            Elements[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
            Elements[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
            Elements[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
            Elements[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
            Elements[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
            Elements[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
            Elements[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
            Elements[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
            Elements[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 MultiplyMInv(Matrix4X4 other) {
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
            float a30 = Elements[12], a31 = Elements[13], a32 = Elements[14], a33 = Elements[15];

            float b00 = other.Elements[0], b01 = other.Elements[1], b02 = other.Elements[2], b03 = other.Elements[3];
            float b10 = other.Elements[4], b11 = other.Elements[5], b12 = other.Elements[6], b13 = other.Elements[7];
            float b20 = other.Elements[8], b21 = other.Elements[9], b22 = other.Elements[10], b23 = other.Elements[11];
            float b30 = other.Elements[12], b31 = other.Elements[13], b32 = other.Elements[14], b33 = other.Elements[15];

            Elements[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            Elements[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            Elements[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            Elements[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
            Elements[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            Elements[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            Elements[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            Elements[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
            Elements[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            Elements[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            Elements[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            Elements[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
            Elements[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            Elements[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            Elements[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            Elements[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 MultiplyM2(Matrix4X4 other, Matrix4X4 dest) {
            // Cache the matrix values (makes for huge speed increases!)
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
            float a30 = Elements[12], a31 = Elements[13], a32 = Elements[14], a33 = Elements[15];

            float b00 = other.Elements[0], b01 = other.Elements[1], b02 = other.Elements[2], b03 = other.Elements[3];
            float b10 = other.Elements[4], b11 = other.Elements[5], b12 = other.Elements[6], b13 = other.Elements[7];
            float b20 = other.Elements[8], b21 = other.Elements[9], b22 = other.Elements[10], b23 = other.Elements[11];
            float b30 = other.Elements[12], b31 = other.Elements[13], b32 = other.Elements[14], b33 = other.Elements[15];

            dest.Elements[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
            dest.Elements[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
            dest.Elements[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
            dest.Elements[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
            dest.Elements[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
            dest.Elements[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
            dest.Elements[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
            dest.Elements[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
            dest.Elements[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
            dest.Elements[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
            dest.Elements[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
            dest.Elements[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
            dest.Elements[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
            dest.Elements[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
            dest.Elements[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
            dest.Elements[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 TransformV(Vector3 vect) {
            float x = vect.Elements[0], y = vect.Elements[1], z = vect.Elements[2];

            vect.Elements[0] = Elements[0] * x + Elements[4] * y + Elements[8] * z + Elements[12];
            vect.Elements[1] = Elements[1] * x + Elements[5] * y + Elements[9] * z + Elements[13];
            vect.Elements[2] = Elements[2] * x + Elements[6] * y + Elements[10] * z + Elements[14];

            return vect;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 MultiplyAffineM(Matrix4X4 other) {
            float[] newe = SystemCore.Environment.CreateFloat32Array(16);

            newe[0] = this.Elements[0] * other.Elements[0] + this.Elements[4] * other.Elements[1] +
                this.Elements[8] * other.Elements[2];
            newe[1] = this.Elements[1] * other.Elements[0] + this.Elements[5] * other.Elements[1] +
                this.Elements[9] * other.Elements[2];
            newe[2] = this.Elements[2] * other.Elements[0] + this.Elements[6] * other.Elements[1] +
                this.Elements[10] * other.Elements[2];
            newe[3] = 0;
            newe[4] = this.Elements[0] * other.Elements[4] + this.Elements[4] * other.Elements[5] +
                this.Elements[8] * other.Elements[6];
            newe[5] = this.Elements[1] * other.Elements[4] + this.Elements[5] * other.Elements[5] +
                this.Elements[9] * other.Elements[6];
            newe[6] = this.Elements[2] * other.Elements[4] + this.Elements[6] * other.Elements[5] +
                this.Elements[10] * other.Elements[6];
            newe[7] = 0;
            newe[8] = this.Elements[0] * other.Elements[8] + this.Elements[4] * other.Elements[9] +
                this.Elements[8] * other.Elements[10];
            newe[9] = this.Elements[1] * other.Elements[8] + this.Elements[5] * other.Elements[9] +
                this.Elements[9] * other.Elements[10];
            newe[10] = this.Elements[2] * other.Elements[8] + this.Elements[6] * other.Elements[9] +
                this.Elements[10] * other.Elements[10];
            newe[11] = 0;
            newe[12] = this.Elements[0] * other.Elements[12] + this.Elements[4] * other.Elements[13] +
                this.Elements[8] * other.Elements[14] + this.Elements[12];
            newe[13] = this.Elements[1] * other.Elements[12] + this.Elements[5] * other.Elements[13] +
                this.Elements[9] * other.Elements[14] + this.Elements[13];
            newe[14] = this.Elements[2] * other.Elements[12] + this.Elements[6] * other.Elements[13] +
                this.Elements[10] * other.Elements[14] + this.Elements[14];
            newe[15] = 1;

            this.Elements = newe;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Rotate(float angle, Vector3 axis) {
            float x = axis.Elements[0], y = axis.Elements[1], z = axis.Elements[2];
            float len = Math.Sqrt(x*x + y*y + z*z);
            if (len != 1) {
                    len = 1 / len;
                    x *= len; 
                    y *= len; 
                    z *= len;
            }
        
            float s = Math.Sin(angle);
            float c = Math.Cos(angle);
            float t = 1-c;
        
            // Cache the matrix values (makes for huge speed increases!)
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
        
            // Construct the elements of the rotation matrix
            float b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
            float b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
            float b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
        
            // Perform rotation-specific matrix multiplication
            Elements[0] = a00*b00 + a10*b01 + a20*b02;
            Elements[1] = a01 * b00 + a11 * b01 + a21 * b02;
            Elements[2] = a02 * b00 + a12 * b01 + a22 * b02;
            Elements[3] = a03 * b00 + a13 * b01 + a23 * b02;

            Elements[4] = a00 * b10 + a10 * b11 + a20 * b12;
            Elements[5] = a01 * b10 + a11 * b11 + a21 * b12;
            Elements[6] = a02 * b10 + a12 * b11 + a22 * b12;
            Elements[7] = a03 * b10 + a13 * b11 + a23 * b12;

            Elements[8] = a00 * b20 + a10 * b21 + a20 * b22;
            Elements[9] = a01 * b20 + a11 * b21 + a21 * b22;
            Elements[10] = a02 * b20 + a12 * b21 + a22 * b22;
            Elements[11] = a03 * b20 + a13 * b21 + a23 * b22;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 RotateX(float angle) {
            float s = Math.Sin(angle);
            float c = Math.Cos(angle);
        
            // Cache the matrix values (makes for huge speed increases!)
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
        
            // Perform axis-specific matrix multiplication
            Elements[4] = a10*c + a20*s;
            Elements[5] = a11 * c + a21 * s;
            Elements[6] = a12 * c + a22 * s;
            Elements[7] = a13 * c + a23 * s;

            Elements[8] = a10 * -s + a20 * c;
            Elements[9] = a11 * -s + a21 * c;
            Elements[10] = a12 * -s + a22 * c;
            Elements[11] = a13 * -s + a23 * c;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 RotateY(float angle) {
            float s = Math.Sin(angle);
            float c = Math.Cos(angle);
        
            // Cache the matrix values (makes for huge speed increases!)
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
        
            // Perform axis-specific matrix multiplication
            Elements[0] = a00 * c + a20 * -s;
            Elements[1] = a01 * c + a21 * -s;
            Elements[2] = a02 * c + a22 * -s;
            Elements[3] = a03 * c + a23 * -s;

            Elements[8] = a00 * s + a20 * c;
            Elements[9] = a01 * s + a21 * c;
            Elements[10] = a02 * s + a22 * c;
            Elements[11] = a03 * s + a23 * c;

            /*Elements[0] = c;
            Elements[1] = 0;
            Elements[2] = -s;
            Elements[3] = 0;
            Elements[4] = 0;
            Elements[5] = 1;
            Elements[6] = 0;
            Elements[7] = 0;
            Elements[8] = s;
            Elements[9] = 0;
            Elements[10] = c;
            Elements[11] = 0;
            Elements[12] = 0;
            Elements[13] = 0;
            Elements[14] = 0;
            Elements[15] = 1;*/

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 RotateZ(float angle) {
            float s = Math.Sin(angle);
            float c = Math.Cos(angle);

            // Cache the matrix values (makes for huge speed increases!)
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];

            // Perform axis-specific matrix multiplication
            Elements[0] = a00 * c + a10 * s;
            Elements[1] = a01 * c + a11 * s;
            Elements[2] = a02 * c + a12 * s;
            Elements[3] = a03 * c + a13 * s;

            Elements[4] = a00 * -s + a10 * c;
            Elements[5] = a01 * -s + a11 * c;
            Elements[6] = a02 * -s + a12 * c;
            Elements[7] = a03 * -s + a13 * c;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 SetRotation3(float x, float y, float z) {
            float sx = Math.Sin(x);
            float cx = Math.Cos(x);
            float sy = Math.Sin(y);
            float cy = Math.Cos(y);
            float sz = Math.Sin(z);
            float cz = Math.Cos(z);

            Elements[0] = cz * cy;
            Elements[1] = sz * cy;
            Elements[2] = -sy;
            Elements[3] = 0;
            Elements[4] = -sz * cx + cz * sy * sx;
            Elements[5] = cz * cx + sz * sy * sx;
            Elements[6] = cy * sx;
            Elements[7] = 0;
            Elements[8] = sz * sx + cz * sy * cx;
            Elements[9] = cz * (-sx) + sz * sy * sx;
            Elements[10] = cy * cx;
            Elements[11] = 0;
            Elements[12] = 0;
            Elements[13] = 0;
            Elements[14] = 0;
            Elements[15] = 1;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 SetRotation(Vector3 rotation) {
            float x = rotation.Elements[0]; float y = rotation.Elements[1]; float z = rotation.Elements[2];

            float sx = Math.Sin(x);
            float cx = Math.Cos(x);
            float sy = Math.Sin(y);
            float cy = Math.Cos(y);
            float sz = Math.Sin(z);
            float cz = Math.Cos(z);

            Elements[0] = cz * cy;
            Elements[1] = sz * cy;
            Elements[2] = -sy;
            Elements[3] = 0;
            Elements[4] = -sz * cx + cz * sy * sx;
            Elements[5] = cz * cx + sz * sy * sx;
            Elements[6] = cy * sx;
            Elements[7] = 0;
            Elements[8] = sz * sx + cz * sy * cx;
            Elements[9] = cz * (-sx) + sz * sy * sx;
            Elements[10] = cy * cx;
            Elements[11] = 0;
            Elements[12] = 0;
            Elements[13] = 0;
            Elements[14] = 0;
            Elements[15] = 1;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Scale(Vector3 scale) {
            Elements[0] *= scale.Elements[0];
            Elements[1] *= scale.Elements[0];
            Elements[2] *= scale.Elements[0];
            Elements[3] *= scale.Elements[0];
            Elements[4] *= scale.Elements[1];
            Elements[5] *= scale.Elements[1];
            Elements[6] *= scale.Elements[1];
            Elements[7] *= scale.Elements[1];
            Elements[8] *= scale.Elements[2];
            Elements[9] *= scale.Elements[2];
            Elements[10] *= scale.Elements[2];
            Elements[11] *= scale.Elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Scale1(float value) {
            Elements[0] *= value;
            Elements[1] *= value;
            Elements[2] *= value;
            Elements[3] *= value;
            Elements[4] *= value;
            Elements[5] *= value;
            Elements[6] *= value;
            Elements[7] *= value;
            Elements[8] *= value;
            Elements[9] *= value;
            Elements[10] *= value;
            Elements[11] *= value;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 SetScale1(float value) {
            Elements[0] = value;
            Elements[5] = value;
            Elements[10] = value;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 SetScale3(float x, float y, float z) {
            Elements[0] = x;
            Elements[5] = y;
            Elements[10] = z;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Translate(Vector3 distance) {
            float x = distance.Elements[0], y = distance.Elements[1], z = distance.Elements[2];

            Elements[12] = Elements[0] * x + Elements[4] * y + Elements[8] * z + Elements[12];
            Elements[13] = Elements[1] * x + Elements[5] * y + Elements[9] * z + Elements[13];
            Elements[14] = Elements[2] * x + Elements[6] * y + Elements[10] * z + Elements[14];
            Elements[15] = Elements[3] * x + Elements[7] * y + Elements[11] * z + Elements[15];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Translate3(float x, float y, float z) {

            Elements[12] = Elements[0] * x + Elements[4] * y + Elements[8] * z + Elements[12];
            Elements[13] = Elements[1] * x + Elements[5] * y + Elements[9] * z + Elements[13];
            Elements[14] = Elements[2] * x + Elements[6] * y + Elements[10] * z + Elements[14];
            Elements[15] = Elements[3] * x + Elements[7] * y + Elements[11] * z + Elements[15];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 SetTranslate(Vector3 position) {
            Elements[12] = position.Elements[0];
            Elements[13] = position.Elements[1];
            Elements[14] = position.Elements[2];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 SetTranslate3(float x, float y, float z) {
            Elements[12] = x;
            Elements[13] = y;
            Elements[14] = z;

            return this;
        } 
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 TranslateInverse(Vector3 distance) {
            float x = -distance.Elements[0], y = -distance.Elements[1], z = -distance.Elements[2];

            Elements[12] = Elements[0] * x + Elements[4] * y + Elements[8] * z + Elements[12];
            Elements[13] = Elements[1] * x + Elements[5] * y + Elements[9] * z + Elements[13];
            Elements[14] = Elements[2] * x + Elements[6] * y + Elements[10] * z + Elements[14];
            Elements[15] = Elements[3] * x + Elements[7] * y + Elements[11] * z + Elements[15];

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Transpose() {
            float a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a12 = Elements[6], a13 = Elements[7];
            float a23 = Elements[11];

            Elements[1] = Elements[4];
            Elements[2] = Elements[8];
            Elements[3] = Elements[12];
            Elements[4] = a01;
            Elements[6] = Elements[9];
            Elements[7] = Elements[13];
            Elements[8] = a02;
            Elements[9] = a12;
            Elements[11] = Elements[14];
            Elements[12] = a03;
            Elements[13] = a13;
            Elements[14] = a23;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Clone() {
            return new Matrix4X4(this.Elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Inverse() {
            // Cache the matrix values (makes for huge speed increases!)
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
            float a30 = Elements[12], a31 = Elements[13], a32 = Elements[14], a33 = Elements[15];

            float b00 = a00 * a11 - a01 * a10;
            float b01 = a00 * a12 - a02 * a10;
            float b02 = a00 * a13 - a03 * a10;
            float b03 = a01 * a12 - a02 * a11;
            float b04 = a01 * a13 - a03 * a11;
            float b05 = a02 * a13 - a03 * a12;
            float b06 = a20 * a31 - a21 * a30;
            float b07 = a20 * a32 - a22 * a30;
            float b08 = a20 * a33 - a23 * a30;
            float b09 = a21 * a32 - a22 * a31;
            float b10 = a21 * a33 - a23 * a31;
            float b11 = a22 * a33 - a23 * a32;

            // Calculate the determinant (inlined to avoid double-caching)
            float invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

            Elements[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            Elements[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            Elements[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            Elements[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            Elements[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            Elements[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            Elements[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            Elements[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            Elements[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            Elements[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            Elements[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            Elements[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            Elements[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            Elements[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            Elements[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            Elements[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 Inverse2(Matrix4X4 dest) {
            // Cache the matrix values (makes for huge speed increases!)
            float a00 = Elements[0], a01 = Elements[1], a02 = Elements[2], a03 = Elements[3];
            float a10 = Elements[4], a11 = Elements[5], a12 = Elements[6], a13 = Elements[7];
            float a20 = Elements[8], a21 = Elements[9], a22 = Elements[10], a23 = Elements[11];
            float a30 = Elements[12], a31 = Elements[13], a32 = Elements[14], a33 = Elements[15];

            float b00 = a00 * a11 - a01 * a10;
            float b01 = a00 * a12 - a02 * a10;
            float b02 = a00 * a13 - a03 * a10;
            float b03 = a01 * a12 - a02 * a11;
            float b04 = a01 * a13 - a03 * a11;
            float b05 = a02 * a13 - a03 * a12;
            float b06 = a20 * a31 - a21 * a30;
            float b07 = a20 * a32 - a22 * a30;
            float b08 = a20 * a33 - a23 * a30;
            float b09 = a21 * a32 - a22 * a31;
            float b10 = a21 * a33 - a23 * a31;
            float b11 = a22 * a33 - a23 * a32;

            // Calculate the determinant (inlined to avoid double-caching)
            float invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

            dest.Elements[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            dest.Elements[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            dest.Elements[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            dest.Elements[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            dest.Elements[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            dest.Elements[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            dest.Elements[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            dest.Elements[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            dest.Elements[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            dest.Elements[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            dest.Elements[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            dest.Elements[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            dest.Elements[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            dest.Elements[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            dest.Elements[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            dest.Elements[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Copy(Matrix4X4 other) {
            other.Elements[0] = this.Elements[0];
            other.Elements[1] = this.Elements[1];
            other.Elements[2] = this.Elements[2];
            other.Elements[3] = this.Elements[3];
            other.Elements[4] = this.Elements[4];
            other.Elements[5] = this.Elements[5];
            other.Elements[6] = this.Elements[6];
            other.Elements[7] = this.Elements[7];
            other.Elements[8] = this.Elements[8];
            other.Elements[9] = this.Elements[9];
            other.Elements[10] = this.Elements[10];
            other.Elements[11] = this.Elements[11];
            other.Elements[12] = this.Elements[12];
            other.Elements[13] = this.Elements[13];
            other.Elements[14] = this.Elements[14];
            other.Elements[15] = this.Elements[15];
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakeFrustrum(float left, float right, float bottom, float top, float znear, float zfar) {
            Matrix4X4 ret = new Matrix4X4(null);

            float rl = (right - left);
            float tb = (top - bottom);
            float fn = (zfar - znear);
            ret.Elements[0] = (znear * 2) / rl;
            ret.Elements[1] = 0;
            ret.Elements[2] = 0;
            ret.Elements[3] = 0;
            ret.Elements[4] = 0;
            ret.Elements[5] = (znear * 2) / tb;
            ret.Elements[6] = 0;
            ret.Elements[7] = 0;
            ret.Elements[8] = (right + left) / rl;
            ret.Elements[9] = (top + bottom) / tb;
            ret.Elements[10] = -(zfar + znear) / fn;
            ret.Elements[11] = -1;
            ret.Elements[12] = 0;
            ret.Elements[13] = 0;
            ret.Elements[14] = -(zfar * znear * 2) / fn;
            ret.Elements[15] = 0;


            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakePerspective(float fov, float aspect, float znear, float zfar) {
            float top = znear * Math.Tan(fov * Math.PI / 360.0);
            float right = top * aspect;
            return Matrix4X4.MakeFrustrum(-right, right, -top, top, znear, zfar);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakeOrtho(float left, float right, float bottom, float top, float znear, float zfar) {
            Matrix4X4 ret = new Matrix4X4(null);

            float rl = (right - left);
            float tb = (top - bottom);
            float fn = (zfar - znear);
            ret.Elements[0] = 2 / rl;
            ret.Elements[1] = 0;
            ret.Elements[2] = 0;
            ret.Elements[3] = 0;
            ret.Elements[4] = 0;
            ret.Elements[5] = 2 / tb;
            ret.Elements[6] = 0;
            ret.Elements[7] = 0;
            ret.Elements[8] = 0;
            ret.Elements[9] = 0;
            ret.Elements[10] = -2 / fn;
            ret.Elements[11] = 0;
            ret.Elements[12] = -(left + right) / rl;
            ret.Elements[13] = -(top + bottom) / tb;
            ret.Elements[14] = -(zfar + znear) / fn;
            ret.Elements[15] = 1;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public static Matrix4X4 MakeLookAt(Vector3 eye, Vector3 center, Vector3 up) {
            Matrix4X4 ret = new Matrix4X4(null);

            float eyex = eye.Elements[0],
                eyey = eye.Elements[1],
                eyez = eye.Elements[2],
                upx = up.Elements[0],
                upy = up.Elements[1],
                upz = up.Elements[2],
                centerx = center.Elements[0],
                centery = center.Elements[1],
                centerz = center.Elements[2];

            float z0, z1, z2, x0, x1, x2, y0, y1, y2, len;

            //vec3.direction(eye, center, z);
            z0 = eyex - center.Elements[0];
            z1 = eyey - center.Elements[1];
            z2 = eyez - center.Elements[2];

            // normalize (no check needed for 0 because of early return)
            len = 1 / Math.Sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;

            //vec3.normalize(vec3.cross(up, z, x));
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.Sqrt(x0 * x0 + x1 * x1 + x2 * x2);

            if (len == 0) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            };

            //vec3.normalize(vec3.cross(z, x, y));
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;

            len = Math.Sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (len == 0) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }

            ret.Elements[0] = x0;
            ret.Elements[1] = y0;
            ret.Elements[2] = z0;
            ret.Elements[3] = 0;
            ret.Elements[4] = x1;
            ret.Elements[5] = y1;
            ret.Elements[6] = z1;
            ret.Elements[7] = 0;
            ret.Elements[8] = x2;
            ret.Elements[9] = y2;
            ret.Elements[10] = z2;
            ret.Elements[11] = 0;
            ret.Elements[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            ret.Elements[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            ret.Elements[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            ret.Elements[15] = 1;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

    }
}
