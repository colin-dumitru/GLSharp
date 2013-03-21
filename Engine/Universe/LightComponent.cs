// LightComponent.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;

namespace GLSharp.Universe {
    public class LightComponent : Component {
        public const int TypePoint = 1;

        public Handle LightHandle;

        public LightComponent() {
            this.Type = Component.LightComponent;
        }
    }
}
