// JSLoggingProvider.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Core {
    [Imported]
    [IgnoreNamespace]
    public class JSLoggingProvider : ILoggingProvider {
        public void Log(string message) {
            throw new Exception("Not implemented.");
        }
    }
}
