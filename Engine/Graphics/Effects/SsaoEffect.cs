// SsaoEffect.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Graphics.Core;

namespace GLSharp.Graphics.Effects {
    public class SsaoEffect : IPostProcessEffect {
        private CompiledShader _ssaoShader = null;
        private CompiledShader _compositeShader = null;

        private RenderGroup _ssaoGroup = null;
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
        public SsaoEffect() {
            SsaoEffect that = this;

            /*load ssao shaders*/
            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_ssao.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                    Resource resource = (Resource) sender;
                    that._ssaoShader = (CompiledShader) resource.Data;
                }, true );

            SystemCore.ResourceManager.GetResource("/Data/Shader/phong_pass_ssao_composite.shader", null).ResourceChanged.Subscribe(
                delegate(object sender, object args) {
                    Resource resource = (Resource)sender;
                    that._compositeShader = (CompiledShader)resource.Data;
                }, true);
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Reset(IGraphics graphics) {
            this._ssaoGroup = graphics.CreateRenderGroup(true);
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
            this.BindSsaoShader();
            this._graphics.SwitchRenderGroup(this._ssaoGroup);
            this._graphics.RenderPostProcess();

            /*ssao + diffuse + blur*/
            this.BindFinalShader(previous);
            this._graphics.SwitchRenderGroup(this._finalGroup);
            this._graphics.RenderPostProcess();

            return this._finalGroup;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindSsaoShader() {
            if(this._ssaoShader == null)
                return;

            this._graphics.BindShader(this._ssaoShader);

            /*textures*/
            this._graphics.BindTexture(this._ssaoShader.Uniforms["uSPosition"], this._positionBuffer, 0);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void BindFinalShader(RenderGroup previous) {
            if(this._compositeShader == null)
                return;

            this._graphics.BindShader(this._compositeShader);

            this._graphics.BindTexture(this._compositeShader.Uniforms["uSPost"], previous.RenderTexture, 0);
            this._graphics.BindTexture(this._compositeShader.Uniforms["uSAccumulation"], this._ssaoGroup.RenderTexture, 1);
        }
    }
}
