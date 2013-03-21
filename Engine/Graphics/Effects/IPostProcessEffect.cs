// IPostProcessEffect.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Graphics.Core;

namespace GLSharp.Graphics.Effects {
    public interface IPostProcessEffect {
        Boolean Active { get; set; }

        void Reset(IGraphics graphics);
        void Init(ITexture diffuse, ITexture normal, ITexture position, ITexture accumulation);
        RenderGroup Render(RenderGroup previous);
        
    }
}
