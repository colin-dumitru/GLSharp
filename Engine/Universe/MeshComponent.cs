using System;
using System.Collections.Generic;
using System.Linq;
using GLSharp.Content;

namespace GLSharp.Universe {
    public class MeshComponent : Component {
        public Handle MeshHandle;

        public MeshComponent() {
            /*set the type*/
            this.Type = Component.MeshComponent;
        }

        
    }
}
