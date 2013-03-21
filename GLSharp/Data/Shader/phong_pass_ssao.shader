<?xml version="1.0" encoding="UTF-8"?>
<shader name="Test">

  <uniform>uSPosition</uniform>
 
  <attribute>aVertexPosition</attribute>
  
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		
		/*texture samplers*/
		uniform sampler2D uSPosition;
		
		/*vertex position*/
		varying vec2    vTexCoord;

        void main(void) {
			/*output*/
			vTexCoord = vec2((aVertexPosition.x + 1.0) / 2.0, (aVertexPosition.y + 1.0) / 2.0);
			gl_Position  = vec4(aVertexPosition, 1.0);
        }
        ]]>
    </vertex_shader>
    <fragment_shader>
        <![CDATA[
		
        precision mediump float;

		/*vertex position*/
		varying vec2    vTexCoord;
		
		/*texture samplers*/
		uniform sampler2D uSPosition;

        void main(void) {		
			vec4 position = texture2D(uSPosition, vTexCoord);
			
			float ao = 0.0;

			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(-0.01, 0.0)).z - position.z) * 0.8, 0.0, 1.2);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.01, 0.0)).z - position.z) * 0.8, 0.0, 1.2);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.0, 0.01)).z - position.z) * 0.8, 0.0, 1.2);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.0, -0.01)).z - position.z) * 0.8, 0.0, 1.2);
			
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(-0.01, -0.01)).z - position.z) * 0.4, 0.0, 0.8);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(-0.01, 0.01)).z - position.z) * 0.4, 0.0, 0.8);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.01, -0.01)).z - position.z) * 0.4, 0.0, 0.8);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.01, 0.01)).z - position.z) * 0.4, 0.0, 0.8);
			
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(-0.02, -0.02)).z - position.z) * 0.4, 0.0, 0.4);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(-0.02, 0.02)).z - position.z) * 0.4, 0.0, 0.4);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.02, -0.02)).z - position.z) * 0.4, 0.0, 0.4);
			ao += clamp((texture2D(uSPosition, vTexCoord + vec2(0.02, 0.02)).z - position.z) * 0.4, 0.0, 0.4);
			
			ao = (1.0 - (abs(ao) / 16.0)) * 1.5 - 0.5;

			gl_FragColor = vec4(ao, ao, ao, 1.0);
        }
        ]]>
    </fragment_shader>
</shader>