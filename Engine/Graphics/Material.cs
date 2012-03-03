using System;
using System.Collections.Generic;
using System.Linq;

namespace GLSharp.Graphics {
    public class Material {
        private IShader _shader;

        /// <summary>
        /// Gets and sets the shader used by the material.
        /// </summary>
        public IShader Shader {
            get { return _shader; }
            set { _shader = value; }
        }
        
    }
}
