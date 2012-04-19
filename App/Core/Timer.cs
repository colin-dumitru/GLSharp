using System;
using System.Collections.Generic;
using System.Html;
using System.Linq;


namespace GLSharp.Core {
    public class Timer : ITimer {
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public TimerHandle Start(Action action, int interval, bool repeat) {
            TimerHandle ret = new TimerHandle();
            ret.Repeat = repeat;

            if(repeat) {
                ret.Id = Window.SetInterval(action, interval);
            } else {
                ret.Id = Window.SetTimeout(action, interval);
            }

            return ret;
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Stop(TimerHandle handle) {
            if(handle.Repeat) {
                Window.ClearInterval(handle.Id);
            } else {
                Window.ClearTimeout(handle.Id);
            }
        }
    }
}
