// B2FixtureDef.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Box2D.Collision.Shapes;

namespace Box2D.Dynamics {
    [Imported]
    [ScriptName("b2FixtureDef")]
    public class B2FixtureDef {
        public float Density;
        public float Friction;
        public float Restitution;
        public B2Shape Shape;

        public B2FixtureDef() {
            throw new Exception("Cannot create instance of this class.");
        }
    }
}
