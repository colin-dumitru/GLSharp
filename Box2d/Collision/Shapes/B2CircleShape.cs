// B2CircleShape.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Box2D.Collision.Shapes {
    [Imported]
    [ScriptName("b2CircleShape")]
    public class B2CircleShape : B2Shape {
        public B2CircleShape(float radius) {
            throw new Exception("Cannot create instance of this class.");
        }
    }
}
