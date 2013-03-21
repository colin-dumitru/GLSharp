// RenderGroup.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics.Core {
    public class RenderGroup {
        public IFrameBuffer FrameBuffer;
        public ITexture RenderTexture;
        public IRenderBuffer DepthRenderBuffer;
    }
}
