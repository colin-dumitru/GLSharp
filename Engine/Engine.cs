// Engine.cs
//

using System;
using System.Collections.Generic;
using System.Diagnostics;
using GLSharp.Content;
using GLSharp.Core;
using GLSharp.Game;
using GLSharp.Graphics;
using GLSharp.Universe;

namespace GLSharp {
    public class Engine {
        private TimerHandle _renderHandle = null;

        private GameBase _activeGame;

        /// <summary>
        /// Gets or sets the active game.
        /// </summary>
        public GameBase ActiveGame {
            get { return _activeGame; }
            set { _activeGame = value;
                this._activeGame.Engine = this;
            }
        }

        private World _activeWorld;

        /// <summary>
        /// Gets or sets the active world which will be rendered.
        /// </summary>
        public World World {
            get { return _activeWorld; }
            set { _activeWorld = value; }
        }

        private IGraphics _graphics;

        /// <summary>
        /// Gets or sets the graphics object which renders the scene.
        /// </summary>
        public IGraphics Graphics {
            get { return _graphics; }
            set { _graphics = value; }
        }

        private Library _library;

        /// <summary>
        /// Gets or sets the library.
        /// </summary>
        public Library Library {
            get { return _library; }
            set { _library = value; }
        }
        
        
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
		public void Run() {
            this.InitDebug();

		    if(this.ActiveGame == null)
                throw new Exception("No active game defined.");

            /*render cycle*/
		    this._renderHandle = SystemCore.Timer.Start(this.Graphics.Render, 1000 / 60, true);

            /*initialize graphics*/
		    this.Graphics.Initialize();

            /*initialize game*/
            this.ActiveGame.Initialize();
		}
        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
        [Conditional("DEBUG")]
        private void InitDebug() {
            SystemCore.Logger.Log("warning : debug is enabled.");
        }

    }
}
