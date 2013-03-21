using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Html;
using GLSharp.Graphics;

namespace GLSharp.Html {
    [IgnoreNamespace]
    [Imported]
    public sealed class CanvasElementGl : Element {

        private CanvasElementGl() {
        }

        [IntrinsicProperty]
        public int Height {
            get { return 0; }
            set {}
        }

        [IntrinsicProperty]
        public int Width {
            get { return 0;}
            set {}
        }

        public WebGL GetContext(string contextID, WebGLContextAttributes attributes) {
            return null;
        }

        public string ToDataURL() {
            return null;
        }

        public string ToDataURL(string type) {
            return null;
        }

        public string ToDataURL(string type, params object[] typeArguments) {
            return null;
        }

    }
}
