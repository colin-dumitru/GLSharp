<?xml version="1.0" encoding="UTF-8"?>
<shader name="Test">

  <uniform>uMVMatrix</uniform>
  <uniform>uVMatrix</uniform>
  <uniform>uPMatrix</uniform>
  <uniform>uNMatrix</uniform>
  <uniform>uPass</uniform>
  <uniform>uSampler</uniform>
  <uniform>uShinines</uniform>
  <uniform>uEmissive</uniform>

  <attribute>aVertexPosition</attribute>
  <attribute>aNormalPosition</attribute>
  <attribute>aUVPosition</attribute>
    
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		/*normal position*/
		attribute vec3 aNormalPosition;
		/*texture uv position*/
		attribute vec2 aUVPosition;
		
		/*model view matrix*/
        uniform mat4 uMVMatrix;
		/*perspective matrix*/
        uniform mat4 uPMatrix;
		/*normal transformation matrix*/
		uniform mat4 uNMatrix;
		/*the current shader pass - 0:diffuse 1:position 2:normal 3: depth*/
        uniform int uPass;
		
		/*texture sampler*/
		uniform sampler2D uSampler;
		/*specular power*/
		uniform float uShinines;
		/*emissive power*/
		uniform float uEmissive;
		
		/*2d texture coordinate*/
		varying vec2 	vTexCoord;
		/*vertex normal*/
		varying vec3 	vNormal;
		/*vertex position*/
		varying vec4 	vPos;
		

        void main(void) {
			/*output*/
			vPos 		= uMVMatrix * vec4(aVertexPosition, 1.0);
			vNormal     = vec3(uNMatrix * vec4(aNormalPosition, 0.0));	
			vTexCoord   = aUVPosition;
            gl_Position = uPMatrix * vPos;
        }
        ]]>
    </vertex_shader>
    <fragment_shader>
        <![CDATA[
        precision mediump float;
		
		/*2d texture coordinate*/
		varying vec2 	vTexCoord;
		/*vertex normal*/
		varying vec3 	vNormal;
		/*vertex position*/
		varying vec4 	vPos;
		
		/*specular power*/
		uniform float uShinines;
		/*emissive power*/
		uniform float uEmissive;
		/*texture sampler*/
		uniform sampler2D uSampler;
		
		/*the current shader pass - 0:diffuse 1:position 2:normal*/
        uniform int uPass;

        void main(void) {
			vec4 texColor = texture2D(uSampler, vTexCoord);
		
			/*diffuse*/
			if(uPass == 0){
				gl_FragColor = vec4(texColor.rgb, uShinines);
			/*position*/
			} else if(uPass == 1){
				gl_FragColor = vec4(vPos.xyz, 1.0);
			/*normal*/
			} else /*if(uPass == 2)*/{		
				gl_FragColor = vec4(vNormal.xyz , 1.0/*depth*/);				
			} 
        }
        ]]>
    </fragment_shader>
</shader>