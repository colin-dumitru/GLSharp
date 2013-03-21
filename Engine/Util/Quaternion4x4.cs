// Quaternion4x4.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Util {
    

    public class Quaternion4x4 {
        public float[] Elements;
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Quaternion4x4(float[] elements) {
            this.Elements = elements == null
                ? SystemCore.Environment.CreateFloat32Array(4)
                : SystemCore.Environment.CreateFloat32ArrayFromArray(elements);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Quaternion4x4 Inverse() {
            this.Elements[0] *= -1;
            this.Elements[1] *= -1;
            this.Elements[2] *= -1;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Quaternion4x4 MultiplyQ(Quaternion4x4 other) {
            float qax = Elements[0], qay = Elements[1], qaz = Elements[2], qaw = Elements[3];
            float qbx = other.Elements[0], qby = other.Elements[1], qbz = other.Elements[2], qbw = other.Elements[3];

            Elements[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
            Elements[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
            Elements[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
            Elements[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

            return this;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Vector3 MultiplyV(Vector3 other) {
            float x = other.Elements[0], y = other.Elements[1], z = other.Elements[2];
            float qx = Elements[0], qy = Elements[1], qz = Elements[2], qw = Elements[3];

            // calculate quat * vec
            float ix = qw * x + qy * z - qz * y;
            float iy = qw * y + qz * x - qx * z;
            float iz = qw * z + qx * y - qy * x;
            float iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            other.Elements[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            other.Elements[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            other.Elements[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

            return other;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Matrix4X4 ToMat4x4() {
            Matrix4X4 ret = new Matrix4X4(null);

            float x = Elements[0], y = Elements[1], z = Elements[2], w = Elements[3];

            float x2 = x + x;
            float y2 = y + y;
            float z2 = z + z;

            float xx = x * x2;
            float xy = x * y2;
            float xz = x * z2;

            float yy = y * y2;
            float yz = y * z2;
            float zz = z * z2;

            float wx = w * x2;
            float wy = w * y2;
            float wz = w * z2;

            ret.Elements[0] = 1 - (yy + zz);
            ret.Elements[1] = xy - wz;
            ret.Elements[2] = xz + wy;
            ret.Elements[3] = 0;

            ret.Elements[4] = xy + wz;
            ret.Elements[5] = 1 - (xx + zz);
            ret.Elements[6] = yz - wx;
            ret.Elements[7] = 0;

            ret.Elements[8] = xz - wy;
            ret.Elements[9] = yz + wx;
            ret.Elements[10] = 1 - (xx + yy);
            ret.Elements[11] = 0;

            ret.Elements[12] = 0;
            ret.Elements[13] = 0;
            ret.Elements[14] = 0;
            ret.Elements[15] = 1;

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Quaternion4x4 Clone() {
            return new Quaternion4x4(this.Elements);
        }
    }
}
