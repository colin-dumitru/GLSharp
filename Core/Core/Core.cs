// Environment.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Core {
    public static class Core {
        private static IEnvironment _environment = null;


        public static IEnvironment Environment { get { return _environment; } set { _environment = value; } }
    }
}
