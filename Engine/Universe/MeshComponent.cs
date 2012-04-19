using System;
using System.Collections.Generic;
using System.Linq;
using GLSharp.Content;

namespace GLSharp.Universe {
    public class MeshComponent : Component {
        private Handle _meshHandle;

        public Handle MeshHandle {
            get { return _meshHandle; }
            set { _meshHandle = value; }
        }

        public MeshComponent() {
            /*set the type*/
            this._type = Component.MeshComponent;
        }

        
    }
}
