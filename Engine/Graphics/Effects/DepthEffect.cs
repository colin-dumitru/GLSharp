// SsaoEffect.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Graphics.Core;

namespace GLSharp.Graphics.Effects {
    public class DepthEffect : IPostProcessEffect {
        private CompiledShader _depthShader = null;

        private RenderGroup _finalGroup = null;

        private ITexture _diffuseBuffer = null;
        private ITexture _normalBuffer = null;
        private ITexture _positionBuffer = null;
        private ITexture _accBuffer = null;

        private Boolean _active = true;

        private IGraphics _graphics;


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public Boolean Active {
            get { return this._active; }
            set { this._active = value; }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public DepthEffect() {
            DepthEffect that = this;

            /*load ssao shaders*/
            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_depth.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                    Resource resource = (Resource) sender;
                    that._depthShader = (CompiledShader)resource.Data;
                }, true );
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Reset(IGraphics graphics) {
            this._finalGroup = graphics.CreateRenderGroup(true);

            this._graphics = graphics;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Init(ITexture diffuse, ITexture normal, ITexture position, ITexture accumulation) {
            this._diffuseBuffer = diffuse;
            this._normalBuffer = normal;
            this._positionBuffer = position;
            this._accBuffer = accumulation;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public RenderGroup Render(RenderGroup previous) {
            if (!this._active)
                return previous;

            /*create ssao accumulation buffer*/
            this.BindMotionBlurShader(previous);

            this._graphics.SwitchRenderGroup(this._finalGroup);
            this._graphics.RenderPostProcess();

            return this._finalGroup;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindMotionBlurShader(RenderGroup current) {
            if (this._depthShader == null)
                return;

            this._graphics.BindShader(this._depthShader);

            /*textures*/
            this._graphics.BindTexture(this._depthShader.Uniforms["uSPost"], current.RenderTexture, 0);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
    }
}
