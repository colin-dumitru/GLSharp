// LightConverter.cs
//

using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using GLSharp.Core;

namespace GLSharp.Content {
    [IgnoreNamespace]
    [Imported]
    internal abstract class LightPropertyObject {
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Key { get; set; }
        [PreserveCase]
        [IntrinsicProperty]
        public abstract String Value { get; set; }
    }

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
        public abstract List<LightPropertyObject> Properties { get; set; } 
    }

    public class LightItem : ResourceItem{
        public int LightType;
        public Dictionary<String, object> Properties;

        public override Boolean Free() {
            this.Alocated = false;
            return true;
        }
        public override Boolean Readlocate() {
            this.Alocated = true;
            return true;
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

        public ResourceItem Convert(object input, String collection) {
            LightObject obj = (LightObject) input;
            LightItem ret = new LightItem();

            ret.LightType = obj.Type;
            ret.Properties = new Dictionary<string, object>();

            foreach (LightPropertyObject property in obj.Properties) {
                if(property.Key == "color") {
                    String[] colors = property.Value.Split(' ');
                    float[] colorf = SystemCore.Environment.CreateFloat32Array((ulong)colors.Length);

                    for (int i = 0; i < colors.Length; i++) {
                        colorf[i] = float.Parse(colors[i]);
                    }

                    ret.Properties["color"] = colorf;
                } else if (property.Key == "intensity") {
                    ret.Properties["intensity"] = float.Parse(property.Value);
                } else if (property.Key == "falloff_angle") {
                    ret.Properties["falloff_angle"] = float.Parse(property.Value);
                }
            }

            return ret;
        }
    }
}
