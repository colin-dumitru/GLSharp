// Environment.cs
//

using System;
using System.Collections.Generic;
using System.Diagnostics;
using GLSharp.Data;

namespace GLSharp.Core {
    public interface ILoggingProvider {
        void Log(string message);
    }

    public static class SystemCore {
        private static IEnvironment _environment = null;

        /// <summary>
        /// Gets or sets the global Environment object.
        /// </summary>
        public static IEnvironment Environment;

        /// <summary>
        /// Gets or sets the global ResourceManager.
        /// </summary>
        public static IResourceManager ResourceManager;

        /// <summary>
        /// Gets or sets the Logging Provider.
        /// </summary>
        public static ILoggingProvider Logger;

        /// <summary>
        /// Gets or sets the timingprovider.
        /// </summary>
        public static ITimer Timer;

        /// <summary>
        /// Gets or sets the input provider.
        /// </summary>
        public static IInputProvider Input;

        [Conditional("DEBUG")]
        public static void Assert(Boolean condition, String message) {
            if(condition)
                Logger.Log(message);
        }

        [Conditional("DEBUG")]
        public static void Log(String message) {
            Logger.Log(message);
        }
    }
}
