<?xml version="1.0" encoding="UTF-8"?>
<shader name="Test">

  <uniform>uSPost</uniform>
  
  <attribute>aVertexPosition</attribute>
  
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		/*vertex position*/
        attribute vec2 aTexturePosition;
		
		/*texture samplers*/
		uniform sampler2D uSPost;
		
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
		
        void main(void) {		
			vec4 color = texture2D(uSPost, vTexCoord);
			
			gl_FragColor = color;
        }
        ]]>
    </fragment_shader>
</shader>