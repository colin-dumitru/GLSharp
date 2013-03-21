// MaterialComponent.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;

namespace GLSharp.Universe {
    public class MaterialComponent : Component {
        public Handle MaterialHandle;

        public MaterialComponent() {
            /*set the type*/
            this.Type = Component.MaterialComponent;
        }
    }
}
