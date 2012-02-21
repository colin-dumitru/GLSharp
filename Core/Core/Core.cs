// Environment.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Data;

namespace GLSharp.Core {
    public static class Core {
        private static IEnvironment _environment = null;
        private static IResourceManager _resourceManager = null;

        /// <summary>
        /// Gets or sets the global Environment object.
        /// </summary>
        public static IEnvironment Environment { 
            get { return _environment; } 
            set { _environment = value; } 
        }
        /// <summary>
        /// Gets or sets the global ResourceManager.
        /// </summary>
        public static IResourceManager ResourceManager {
            get { return _resourceManager; }
            set { _resourceManager = value; }
        }
    }
}
