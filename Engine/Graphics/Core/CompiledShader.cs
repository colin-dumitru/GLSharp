// ICompiledShader.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics {
    public class CompiledShader {

        /// <summary>
        /// Gets the shader name.
        /// </summary>
        public String Name;

        /// <summary>
        /// Getsor sets the compiled shader programs.
        /// </summary>
        public IShaderProgram ShaderProgram;

        /// <summary>
        /// Uniform locations.
        /// </summary>
        public Dictionary<String, IUniformLocation> Uniforms;

        /// <summary>
        /// Attribute locations.
        /// </summary>
        public Dictionary<String, int> Attributes;

    }
}
