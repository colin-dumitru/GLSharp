// Environment.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Data;

namespace GLSharp.Core {
    public interface ILoggingProvider {
        void Log(String message);
    }

    public static class SystemCore {
        private static IEnvironment _environment = null;

        /// <summary>
        /// Gets or sets the global Environment object.
        /// </summary>
        public static IEnvironment Environment { 
            get { return _environment; } 
            set { _environment = value; } 
        }

        private static IResourceManager _resourceManager = null;

        /// <summary>
        /// Gets or sets the global ResourceManager.
        /// </summary>
        public static IResourceManager ResourceManager {
            get { return _resourceManager; }
            set { _resourceManager = value; }
        }

        private static ILoggingProvider _logger;

        /// <summary>
        /// Gets or sets the Logging Provider.
        /// </summary>
        public static ILoggingProvider Logger {
            get { return _logger; }
            set { _logger = value; }
        }
        
    }
}
