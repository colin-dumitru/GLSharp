// ICore.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Core {
    public interface IEnvironment {
        /// <summary>
        /// Creates an empty float 32 array
        /// </summary>
        /// <returns></returns>
        float[] CreateFloat32Array(ulong size);
        /// <summary>
        /// Creates an empty float 64 array
        /// </summary>
        /// <returns></returns>
        double[] CreateFloat64Array(ulong size);
        /// <summary>
        /// Creates an empty int 8 array
        /// </summary>
        /// <returns></returns>
        byte[] CreateInt8Array(ulong size);
        /// <summary>
        /// Creates an empty unsigned int 8 array
        /// </summary>
        /// <returns></returns>
        char[] CreateUInt8Array(ulong size);
        /// <summary>
        /// Creates an empty int 16 array
        /// </summary>
        /// <returns></returns>
        short[] CreateInt16Array(ulong size);
        /// <summary>
        /// Creates an empty unsigned int 16 array
        /// </summary>
        /// <returns></returns>
        ushort[] CreateUInt16Array(ulong size);
        /// <summary>
        /// Creates an empty int 32 array
        /// </summary>
        /// <returns></returns>
        int[] CreateInt32Array(ulong size);
        /// <summary>
        /// Creates an empty unsigned int 32 array
        /// </summary>
        /// <returns></returns>
        uint[] CreateUInt32Array(ulong size);

        /// <summary>
        /// Creates a float 32 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        float[] CreateFloat32ArrayFromArray(float[] input);
        /// <summary>
        /// Creates a float 64 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        double[] CreateFloat64ArrayFromArray(double[] input);
        /// <summary>
        /// Creates a int 8 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        byte[] CreateInt8ArrayFromArray(byte[] input);
        /// <summary>
        /// Creates a unsigned int 8 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        char[] CreateUInt8ArrayFromArray(char[] input);
        /// <summary>
        /// Creates a int 16 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        short[] CreateInt16ArrayFromArray(short[] input);
        /// <summary>
        /// Creates a unsigned int 16 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        ushort[] CreateUInt16ArrayFromArray(ushort[] input);
        /// <summary>
        /// Creates a int 32 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        int[] CreateInt32ArrayFromArray(int[] input);
        /// <summary>
        /// Creates a unsigned int 32 array from a specified input array.
        /// </summary>
        /// <returns></returns>
        uint[] CreateUInt32ArrayFromArray(uint[] input);

        /// <summary>
        /// Initialises an objects properties.
        /// </summary>
        /// <param name="obj">The object to initialize.</param>
        /// <param name="args">The properties for initialisation. The count
        ///                     moust be a multiple of 2.</param>
        /// <returns>The same object passed as an argument.</returns>
        Object Init(Object obj, Object[] args);


        void RequestAnimationFrame(Action action);
    }
}
