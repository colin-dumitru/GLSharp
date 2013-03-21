// VertexBoundingVolume.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Util {
    public class VertexBoundingVolume {
        /// <summary>
        /// The center of the bounding volume.
        /// </summary>
        public Vector3 Center;
        /// <summary>
        /// The vertex which is furthest away from the center. This is needed too calculate 
        /// the radius of the bounding sphere after MV transformation.
        /// </summary>
        public int VertexIndex;
    }
}
