// MeshConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using GLSharp.Core;
using GLSharp.Graphics;
using GLSharp.Util;

namespace GLSharp.Content {
    /// <summary>
    /// Mesh object wich much be deserialzed from a JSON object.
    /// </summary>
    [Imported]
    [IgnoreNamespace]
    internal abstract class MeshObject {
        [IntrinsicProperty]
        [PreserveCase]
        public abstract String Id { get; set; }
        [IntrinsicProperty]
        [PreserveCase]
        public abstract ushort[] Indexes { get; set; }
        [IntrinsicProperty]
        [PreserveCase]
        public abstract float[] Normals { get; set; }
        [IntrinsicProperty]
        [PreserveCase]
        public abstract float[] UVs { get; set; }
        [IntrinsicProperty]
        [PreserveCase]
        public abstract float[] Vertices { get; set; }
    }

    /// <summary>
    /// Mesh item which will reside inside a collection.
    /// </summary>
    public class MeshItem : ResourceItem{
        /*Index buffer*/
        public ushort[] Indexes;
        /*contains the position, normal and uv buffers*/
        public float[] Mesh;
        public int OffsetPosition;
        public int OffsetNormal;
        public int OffsetUv;

        /*minum bounding volume*/
        public VertexBoundingVolume BoundingVolume;

        /// <summary>
        /// Contains both Position - Normal - Uv data (in this order)
        /// </summary>
        public IBuffer MeshBuffer;
        /// <summary>
        /// Index buffer.
        /// </summary>
        public IBuffer IndexBuffer;

        private IGraphics _graphics;

        public MeshItem(IGraphics graphics) {
            this._graphics = graphics;
        }

        public override Boolean Free() {
            return !(this.Alocated = !this._graphics.AllocateMesh(this));
        }
        public override Boolean Readlocate() {
            return (this.Alocated = this._graphics.AllocateMesh(this));
        }

        public void ComputeBoundingVolume() {
            Vector3 vertexAverage = new Vector3(null);

            /*compute center as vertex average*/
            for(int i = 0; i < OffsetNormal; i += 3) {
                vertexAverage.Add3(Mesh[i], Mesh[i + 1], Mesh[i + 2]);
            }

            vertexAverage.Scale(1.0f / (OffsetNormal / 3.0f));

            int vertexIndex = -1;
            float dist = -1.0f;
            float maxDist = -1.0f;

            /*get the maximum distance from center and the furthest vertex*/
            for (int i = 0; i < OffsetNormal; i += 3) {
                dist = vertexAverage.Distance3(Mesh[i], Mesh[i + 1], Mesh[i + 2]);

                if (dist > maxDist) {
                    maxDist = dist;
                    vertexIndex = i / 3;
                }
            }

            this.BoundingVolume = new VertexBoundingVolume();
            this.BoundingVolume.Center = vertexAverage;
            this.BoundingVolume.VertexIndex = vertexIndex;
        }
    }

    /// <summary>
    /// Converter for items of type "mesh"
    /// </summary>
    public class MeshConverter : IResourceConverter {
        private IGraphics _graphics;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public MeshConverter(IGraphics graphics) {
            this._graphics = graphics;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public string TypeHandled {
            get { return "mesh"; }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------		
        public ResourceItem Convert(object input, String collection) {
            if (input == null)
                return null;

            MeshObject obj = (MeshObject) input;
            MeshItem ret = new MeshItem(this._graphics);

            if (obj.Indexes == null) obj.Indexes = SystemCore.Environment.CreateUInt16Array(0);
            if (obj.Vertices == null) obj.Vertices = SystemCore.Environment.CreateFloat32Array(0);
            if (obj.Normals == null) obj.Normals = SystemCore.Environment.CreateFloat32Array(0);
            if (obj.UVs == null) obj.UVs = SystemCore.Environment.CreateFloat32Array(0);

            ret.Indexes = SystemCore.Environment.CreateUInt16ArrayFromArray(obj.Indexes);
            ret.Mesh = SystemCore.Environment.CreateFloat32Array((ulong) (obj.Vertices.Length + obj.Normals.Length + obj.UVs.Length));
            ret.OffsetPosition = 0;
            ret.OffsetNormal = obj.Vertices.Length;
            ret.OffsetUv = obj.Vertices.Length + obj.Normals.Length;

            /*mesh data*/
            for (int i = 0; i < obj.Vertices.Length; i++) ret.Mesh[i] = obj.Vertices[i];
            for (int i = 0; i < obj.Normals.Length; i++)  ret.Mesh[i + ret.OffsetNormal] = obj.Normals[i];
            for (int i = 0; i < obj.UVs.Length; i++)      ret.Mesh[i + ret.OffsetUv] = obj.UVs[i];
            /*bounding volume*/
            ret.ComputeBoundingVolume();

            return ret;
        }
    }
}
