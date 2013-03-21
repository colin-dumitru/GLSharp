// TextureConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using GLSharp.Core;
using GLSharp.Data;
using GLSharp.Graphics;

namespace GLSharp.Content {
    [IgnoreNamespace]
    [Imported]
    internal abstract class TextureObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Id { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Url { get; set; }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class TextureItem : ResourceItem {
        public ITexture Texture;
        private IGraphics _graphics;
        public IImageResource Image;

        public TextureItem(IGraphics graphics) {
            this._graphics = graphics;
        }

        public override Boolean Free() {
            return !(this.Alocated = !this._graphics.AllocateTexture(this));
        }
        public override Boolean Readlocate() {
            return(this.Alocated = this._graphics.AllocateTexture(this));
        }
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    public class TextureConverter : IResourceConverter {
        private IGraphics _graphics;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public TextureConverter(IGraphics graphics) {
            this._graphics = graphics;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public string TypeHandled {
            get { return "texture"; }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public ResourceItem Convert(object input, String collection) {
            TextureItem ret = new TextureItem(this._graphics);
            TextureObject obj = (TextureObject) input;

            SystemCore.ResourceManager.GetResource(obj.Url, null).ResourceChanged.Subscribe(delegate(object sender, object args) {
                Resource resource = (Resource) sender;
                ret.Image = ((IImageResource) resource.Data);
            }, false);

            return ret;
        }
    }
}
