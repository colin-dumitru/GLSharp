// IActiveInfo.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Graphics {
    public interface IActiveInfo {
        int Size { get; }
        int Type { get; }
        String Name { get; }
    }
}
