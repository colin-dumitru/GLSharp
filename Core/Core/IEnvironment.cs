// ICore.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Core {
    public interface IEnvironment {
        /// <summary>
        /// Creates an ampty float 32 array
        /// </summary>
        /// <returns></returns>
        float[] CreateFloat32Array(ulong size);
        /// <summary>
        /// Creates an ampty float 32 array
        /// </summary>
        /// <returns></returns>
        float[] CreateFloat64Array(ulong size);

        /// <summary>
        /// Initialises an objects properties.
        /// </summary>
        /// <param name="obj">The object to initialize.</param>
        /// <param name="args">The properties for initialisation. The count
        ///                     moust be a multiple of 2.</param>
        /// <returns>The same object passed as an argument.</returns>
        Object Init(Object obj, Object[] args);
    }
}
