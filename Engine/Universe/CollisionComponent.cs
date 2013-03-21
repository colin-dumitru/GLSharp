// CollisionComponent.cs
//

using System;
using System.Collections.Generic;
using Box2D.Common.Math;
using Box2D.Dynamics;

namespace GLSharp.Universe {
    public class CollisionComponent : Component {
        public B2Body Body = null;

        public B2BodyDef BodyDefinition = null;
        public B2FixtureDef FixtureDefinition = null;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public CollisionComponent() {
            this.Type = Component.CollisionComponent;

        }
    }
}
