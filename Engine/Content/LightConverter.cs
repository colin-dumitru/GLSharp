// LightConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using GLSharp.Core;

namespace GLSharp.Content {
    [IgnoreNamespace]
    [Imported]
    internal abstract class LightObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Id { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract int Type { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract Dictionary<String, String> Properties { get; set; } 
    }

    public class LightItem {
        private String _id;

        public String Id {
            get { return _id; }
            set { _id = value; }
        }

        private int _type;

        public int Type {
            get { return _type; }
            set { _type = value; }
        }

        private Dictionary<String, object> _properties;

        public Dictionary<String, object> Properties {
            get { return _properties; }
            set { _properties = value; }
        }
        
    }

    public class LightConverter : IResourceConverter {


        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public string TypeHandled {
            get { return "light"; }
        }

        //------------------------------------------------------------------------------------------
        //------------------------------------------------------------------------------------------
				
        public object Convert(object input) {
            LightObject obj = (LightObject) input;
            LightItem ret = new LightItem();

            ret.Id = obj.Id;
            ret.Type = obj.Type;
            ret.Properties = new Dictionary<string, object>();

            foreach (KeyValuePair<string, string> keyValuePair in obj.Properties) {
                if(keyValuePair.Key == "color") {
                    String[] colors = keyValuePair.Value.Split(' ');
                    float[] colorf = SystemCore.Environment.CreateFloat32Array((ulong)colors.Length);

                    for (int i = 0; i < colors.Length; i++) {
                        colorf[i] = float.Parse(colors[i]);
                    }

                    ret.Properties["color"] = colorf;
                } else if (keyValuePair.Key == "intensity") {
                    ret.Properties["intensity"] = float.Parse(keyValuePair.Value);
                } else if (keyValuePair.Key == "falloff_angle") {
                    ret.Properties["falloff_angle"] = float.Parse(keyValuePair.Value);
                }
            }

            return ret;
        }
    }
}
