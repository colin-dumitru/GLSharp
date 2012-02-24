// CompiledShader.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics {
    public class CompiledShader : ICompiledShader {

        private String _name = "Undefined";
        private IShaderProgram _shaderProgram = new ShaderProgram();
        private readonly Dictionary<String, IUniform> _uniforms = new Dictionary<string, IUniform>();

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public string Name {
            get { return this._name; }
            set { this._name = value; }
        }

        public IShaderProgram ShaderProgram {
            get { return this._shaderProgram; }
            set { this._shaderProgram = value; }
        }

        public Dictionary<string, IUniform> Uniforms {
            get { return this._uniforms; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
    }
}
