// IImage.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Data {
    public interface IImageResource {
        [IntrinsicProperty]
        string Alt { get; set; }

        [IntrinsicProperty]
        bool Complete { get; }

        [IntrinsicProperty]
        string Src { get; }

        [IntrinsicProperty]
        int Height { get; }

        [IntrinsicProperty]
        int NaturalHeight { get;}

        [IntrinsicProperty]
        int NaturalWidth { get;}

        [IntrinsicProperty]
        int Width { get;}
    }
}
