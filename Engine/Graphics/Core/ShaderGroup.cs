// Class1.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics {
    public class ShaderGroup {
        public String Name = null;
        public CompiledShader GeometryPassShader = null;
        public CompiledShader FinalPassShader = null;
        public CompiledShader LightPassShader = null;
        public CompiledShader PrePostProcessPassShader = null;
        public IShaderBinder ShaderBinder = null;
    }
}
