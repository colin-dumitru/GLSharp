// Class1.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using GLSharp.Core;
using GLSharp.Game;

namespace GLSharp {

    public class DemoGame : GameBase {
        private TimerHandle _updateHandle = null;

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        protected override void Startup() {
            this.Engine.Library.LoadLibrary("/Data/Lib/test.dae.lib");

            /*register update function*/
            this._updateHandle = SystemCore.Timer.Start(this.Update, 1000 / 20, true);
        }
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        private void Update() {
            
        }
    }
}
    