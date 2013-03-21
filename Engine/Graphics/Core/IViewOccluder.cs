// IViewOccluder.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;
using GLSharp.Core;
using GLSharp.Universe;
using GLSharp.Util;

namespace GLSharp.Graphics {
    public class CullInfo {
        public float[] ModelView = null;
        public float[] NearClip = SystemCore.Environment.CreateFloat32Array(4);				// Four clip planes in the form of Ax + By + Cz + D = 0 (ABCD are in the array.)
        public float[] FarClip = SystemCore.Environment.CreateFloat32Array(4);				// They are oriented so the positive side of the clip plane is INSIDE the view volume.
        public float[] LeftClip = SystemCore.Environment.CreateFloat32Array(4);
        public float[] RightClip = SystemCore.Environment.CreateFloat32Array(4);
        public float[] BotClip = SystemCore.Environment.CreateFloat32Array(4);
        public float[] TopClip = SystemCore.Environment.CreateFloat32Array(4);
    }

    public interface IViewOccluder {
        Boolean Test(CullInfo cullInfo, Node node, MeshItem meshItem);
    }
}
