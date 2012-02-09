using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace GLSharp.Core {
    [Imported]
    [IgnoreNamespace]
    public class Environment : IEnvironment{
        public float[] CreateFloat32Array(ulong size) {
            throw new global::System.Exception("Not implemented");
        }

        public object Init(object obj, object[] args) {
            throw new global::System.Exception("Not implemented");
        }
    }
}
