// Audio.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Data {
    [Imported]
    [IgnoreNamespace]
    public class Audio : IAudioResource {

        [IntrinsicProperty]
        public int CurrentTime { get; set; }
        [IntrinsicProperty]
        public float Volume { get; set; }
        [IntrinsicProperty]
        public Boolean Paused { get; set; }
        [IntrinsicProperty]
        public int ReadyState { get; set; }
        [IntrinsicProperty]
        public String Src { get; set; }

        public void Play() {}
        public void Pause() {}
        
    }
}
