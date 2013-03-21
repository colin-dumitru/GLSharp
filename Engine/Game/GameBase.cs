// GameBase.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;

namespace GLSharp.Game {
    public abstract class GameBase {
        private Engine _engine;

        public Engine Engine {
            get { return _engine; }
            set { _engine = value; }
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Initialize() {
            this.Startup();    
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        protected abstract void Startup();

    }

}
