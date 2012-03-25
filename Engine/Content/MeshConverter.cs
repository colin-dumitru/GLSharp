// MeshConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using GLSharp.Core;

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
        public abstract int[] Indexes { get; set; }
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
    public class MeshItem {
        private String _id;

        public String Id {
            get { return _id; }
            set { _id = value; }
        }

        private int[] _indexes;

        public int[] Indexes {
            get { return _indexes; }
            set { _indexes = value; }
        }

        private float[] _normals;

        public float[] Normals {
            get { return _normals; }
            set { _normals = value; }
        }

        private float[] _uvs;

        public float[] UVs {
            get { return _uvs; }
            set { _uvs = value; }
        }

        private float[] _vertices;

        public float[] Vertices {
            get { return _vertices; }
            set { _vertices = value; }
        }
    }

    /// <summary>
    /// Converter for items of type "mesh"
    /// </summary>
    public class MeshConverter : IResourceConverter {

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public string TypeHandled {
            get { return "mesh"; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public object Convert(object input) {
            if (input == null)
                return null;

            MeshObject obj = (MeshObject) input;
            MeshItem ret = new MeshItem();

            ret.Id = obj.Id;
            ret.Indexes = SystemCore.Environment.CreateInt32ArrayFromArray(obj.Indexes);
            ret.Normals = SystemCore.Environment.CreateFloat32ArrayFromArray(obj.Normals);
            ret.UVs = SystemCore.Environment.CreateFloat32ArrayFromArray(obj.UVs);
            ret.Vertices = SystemCore.Environment.CreateFloat32ArrayFromArray(obj.Vertices);

            return ret;
        }
    }
}
