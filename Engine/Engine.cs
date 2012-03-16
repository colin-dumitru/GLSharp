// Engine.cs
//

using System;
using System.Collections.Generic;
using GLSharp.Game;

namespace GLSharp {
    public class Engine {
        private GameBase _activeGame;

        /// <summary>
        /// Gets or sets the active game.
        /// </summary>
        public GameBase ActiveGame {
            get { return _activeGame; }
            set { _activeGame = value; }
        }


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
		public void Run() {
		    if(this.ActiveGame == null)
                throw new Exception("No active game defined.");

            /*initialize engine*/
            this.ActiveGame.Initialize();
		}

    }
}
