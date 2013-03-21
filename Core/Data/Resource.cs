// Resource.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Core;

namespace GLSharp.Data {
    public class Resource {
        private Boolean _finished;
        private Object _data;

        /// <summary>
        /// Inidicates whether or not the resource has finished loading.
        /// </summary>
        public Boolean Finished {
            get { return _finished; }
            set { _finished = value; }
        }

        /// <summary>
        /// Gets the data loaded. Null if no data i loaded.
        /// </summary>
        public Object Data {
            get { return _data; }
            set { 
                _data = value;
                if (this.ResourceChanged != null)
                    this.ResourceChanged.Fire(this, null);
            }
        }

        /// <summary>
        /// Called when the Data object has changed. Sender object is of type Resource.
        /// </summary>
        public Event ResourceChanged = new Event();
    }
}
