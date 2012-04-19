// Event.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Core {
    public delegate void EventHandler(Object sender, Object args);

    /// <summary>
    /// Faster implementation than the Script# one.
    /// </summary>
    public class Event {
        private List<EventHandler> _events = null;

        public Event() {
            
        }

        public void Subscribe(EventHandler handler, Nullable<Boolean> unique) {
            if(this._events == null)
                this._events = new List<EventHandler>();

            if (unique == true && this._events.Contains(handler))
                return;

            this._events.Add(handler);
        }

        public void Unsubscribe(EventHandler handler) {
            if(this._events == null)
                return;

            this._events.Remove(handler);
        }

        public void Fire(Object sender, Object args) {
            if(this._events != null)
                for (int i = 0; i < this._events.Count; i++) {
                    this._events[i](sender, args);
                }
        }

    }
}
