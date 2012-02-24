// ICompiledShader.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics {
    public interface ICompiledShader {

        /// <summary>
        /// Gets the shader name.
        /// </summary>
        String Name { get; }

        /// <summary>
        /// Getsor sets the compiled shader programs.
        /// </summary>
        IShaderProgram ShaderProgram { get;}

        /// <summary>
        /// Gets the uniform list paired by their name.
        /// </summary>
        Dictionary<String, IUniform> Uniforms { get; }
    }
}
