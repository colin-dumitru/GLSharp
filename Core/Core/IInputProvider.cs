// IInputManager.cs
//

using System;
using System.Collections.Generic;

namespace GLSharp.Core {
    public class Keys {
        public const int Backspace = 8;
        public const int Tab = 9;
        public const int Enter = 13;
        public const int Shift = 16;
        public const int Ctrl = 17;
        public const int Alt = 18;
        public const int PauseBreak = 19;
        public const int CapsLock = 20;
        public const int Escape = 27;
        public const int Space = 32;
        public const int PageUp = 33;
        public const int PageDown = 34;
        public const int End = 35;
        public const int Home = 36;
        public const int LeftArrow = 37;
        public const int UpArrow = 38;
        public const int RightArrow = 39;
        public const int DownArrow = 40;
        public const int InsertKey = 45;
        public const int DeleteKey = 46;
        public const int Key0 = 48;
        public const int Key1 = 49;
        public const int Key2 = 50;
        public const int Key3 = 51;
        public const int Key4 = 52;
        public const int Key5 = 53;
        public const int Key6 = 54;
        public const int Key7 = 55;
        public const int Key8 = 56;
        public const int Key9 = 57;
        public const int A = 65;
        public const int B = 66;
        public const int C = 67;
        public const int D = 68;
        public const int E = 69;
        public const int F = 70;
        public const int G = 71;
        public const int H = 72;
        public const int I = 73;
        public const int J = 74;
        public const int K = 75;
        public const int L = 76;
        public const int M = 77;
        public const int N = 78;
        public const int O = 79;
        public const int P = 80;
        public const int Q = 81;
        public const int R = 82;
        public const int S = 83;
        public const int T = 84;
        public const int U = 85;
        public const int V = 86;
        public const int W = 87;
        public const int X = 88;
        public const int Y = 89;
        public const int Z = 90;
        public const int LeftWindowKey = 91;
        public const int RightWindowKey = 92;
        public const int SelectKey = 93;
        public const int Numpad0 = 96;
        public const int Numpad1 = 97;
        public const int Numpad2 = 98;
        public const int Numpad3 = 99;
        public const int Numpad4 = 100;
        public const int Numpad5 = 101;
        public const int Numpad6 = 102;
        public const int Numpad7 = 103;
        public const int Numpad8 = 104;
        public const int Numpad9 = 105;
        public const int Multiply = 106;
        public const int Add = 107;
        public const int Subtract = 109;
        public const int DecimalPoint = 110;
        public const int Divide = 111;
        public const int F1 = 112;
        public const int F2 = 113;
        public const int F3 = 114;
        public const int F4 = 115;
        public const int F5 = 116;
        public const int F6 = 117;
        public const int F7 = 118;
        public const int F8 = 119;
        public const int F9 = 120;
        public const int F10 = 121;
        public const int F11 = 122;
        public const int F12 = 123;
        public const int NumLock = 144;
        public const int ScrollLock = 145;
        public const int SemiColon = 186;
        public const int EqualSign = 187;
        public const int Comma = 188;
        public const int Dash = 189;
        public const int Period = 190;
        public const int ForwardSlash = 191;
        public const int GraveAccent = 192;
        public const int OpenBracket = 219;
        public const int BackSlash = 220;
        public const int CloseBraket = 221;
        public const int SingleQuote = 222;

        public const int MouseLeft = 300;
        public const int MouseRight = 301;
        public const int MouseMiddle = 302;
    }

    public interface IInputProvider {
        Boolean KeySet(int key);
        float MouseX { get; }
        float MouseY { get; }
    }
}
