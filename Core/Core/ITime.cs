// ITime.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Core {
    public class TimerHandle {
        private int _id;

        public int Id {
            get { return _id; }
            set { _id = value; }
        }

        private Boolean _repeat;

        public Boolean Repeat {
            get { return _repeat; }
            set { _repeat = value; }
        }
        
    }

    public interface ITimer {
        TimerHandle Start(Action action, int interval, Boolean repeat);
        void Stop(TimerHandle handle);
    }
}
