// Image.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Data {
    public delegate void ImageLoadedHandler();

    [IgnoreNamespace]
    [Imported]
    [ScriptName("Image")]
    public class Image : IImageResource {
        [IntrinsicProperty]
        public string Alt {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        public bool Complete {
            get { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        public string Src {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        public int Height {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        public int NaturalHeight {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        public int NaturalWidth {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        public int Width {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }

        [IntrinsicProperty]
        [ScriptName("onload")]
        public ImageLoadedHandler OnLoad {
            get { throw new Exception("Not implemented."); }
            set { throw new Exception("Not implemented."); }
        }
    }
}
