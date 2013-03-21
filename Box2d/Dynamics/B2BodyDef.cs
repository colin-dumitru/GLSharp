// B2BodyDef.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Box2D.Common.Math;

namespace Box2D.Dynamics {
    [Imported]
    [ScriptName("b2BodyDef")]
    public class B2BodyDef {
        public B2Vec2 Position;
        public float Angle;
        public B2BodyType Type;

        public B2BodyDef() {
            throw new Exception("Cannot create instance of this class.");
        }
    }
}
