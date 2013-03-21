// Event.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace GLSharp.Core {
    public delegate void EventHandler(Object sender, Object args);

    /// <summary>
    /// Faster implementation than the Script# one.
    /// </summary>
    public class Event {
        private List<EventHandler> _handlers = null;

        public Event() {

        }

        public void Subscribe(EventHandler handler, Nullable<Boolean> unique) {
            if (this._handlers == null)
                this._handlers = new List<EventHandler>();

            if (unique == true)
                for (int i = 0; i < this._handlers.Count; i++) {
                    if (this.MethodsEqual(this._handlers[i], handler))
                        return;
                }

            this._handlers.Add(handler);
        }

        public void Unsubscribe(EventHandler handler) {
            if (this._handlers == null)
                return;

            for (int i = 0; i < this._handlers.Count; i++) {
                if (this.MethodsEqual(this._handlers[i], handler)) {
                    this._handlers.RemoveAt(i);
                    break;
                }
            }

            if (this._handlers.Count == 0)
                this._handlers = null;
        }

        public void Fire(Object sender, Object args) {
            if (this._handlers != null)
                for (int i = 0; i < this._handlers.Count; i++) {
                    this._handlers[i].Invoke(sender, args);
                }
        }

        private Boolean MethodsEqual(EventHandler m1, EventHandler m2) {
            return (bool)Script.Literal("(m1.object == m2.object) && (m1.method == m2.method)", null);
        }

    }
}
