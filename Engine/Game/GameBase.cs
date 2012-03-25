// GameBase.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Content;

namespace GLSharp.Game {
    public abstract class GameBase {
        private Library _library = null;

        public Library Library {
            get { return _library; }
        }


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        public void Initialize() {
            /*initialize the library*/
            this._library = new Library();

            this._library.AddConverter(new LightConverter());
            this._library.AddConverter(new MeshConverter());
            this._library.AddConverter(new NodeConverter());

            this.Startup();    
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        protected abstract void Startup();

    }

}
