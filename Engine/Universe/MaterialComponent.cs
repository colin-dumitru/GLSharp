// MaterialComponent.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;

namespace GLSharp.Universe {
    public class MaterialComponent : Component {
        private Handle _materialHandle;

        public Handle MaterialHandle {
            get { return this._materialHandle; }
            set { this._materialHandle = value; }
        }

        public MaterialComponent() {
            /*set the type*/
            this._type = "material";
        }
    }
}
