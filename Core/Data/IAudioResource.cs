// IAudioResource.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Data {
    public interface IAudioResource {
        [IntrinsicProperty]
        int CurrentTime { get; set; }
        [IntrinsicProperty]
        float Volume { get; set; }
        [IntrinsicProperty]
        Boolean Paused { get; set; }
        [IntrinsicProperty]
        int ReadyState { get; set; }
        [IntrinsicProperty]
        String Src { get; set; }

        void Play();
        void Pause();
    }
}
