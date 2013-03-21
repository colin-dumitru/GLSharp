<?xml version="1.0" encoding="UTF-8"?>
<shader name="Motion Blur">

  <uniform>uSPost</uniform>
  <uniform>uSCurrent</uniform>
  
  <attribute>aVertexPosition</attribute>
  
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		
		/*texture samplers*/
		uniform sampler2D uSPost;
		uniform sampler2D uSCurrent;
		
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
		uniform sampler2D uSPost;
		uniform sampler2D uSCurrent;
		
        void main(void) {		
			vec4 post = texture2D(uSPost, vTexCoord);
			vec4 current = texture2D(uSCurrent, vTexCoord);
			
			gl_FragColor = post * 0.6 + current * 0.4;
        }
        ]]>
    </fragment_shader>
</shader>