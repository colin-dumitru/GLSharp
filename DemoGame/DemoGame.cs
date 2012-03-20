// Class1.cs
//

using System;
using System.Collections.Generic;
using System.Html;
using GLSharp.Game;

namespace GLSharp {

    public class DemoGame : GameBase{
        protected override void Startup() {
            this.Library.LoadLibrary("/Data/Lib/test.dae.lib");
        }
    }
}
