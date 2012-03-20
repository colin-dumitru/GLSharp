
// Library.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Graphics;

namespace GLSharp.Resource
{
    public class Library
    {
        private Dictionary<String, ICompiledShader> _shaderSet;

        /// <summary>
        /// The complete set of shaders used for drawing.
        /// </summary>
        public Dictionary<String, ICompiledShader> ShaderSet {
            get { return _shaderSet; }
            set { _shaderSet = value; }
        }

        private Dictionary<String, Mesh> _meshSet;

        /// <summary>
        /// The complete collection of Meshes used for rendering.
        /// </summary>
        public Dictionary<String, Mesh> MeshSet
        {
            get { return _meshSet; }
            set { _meshSet = value; }
        }
    }
}
