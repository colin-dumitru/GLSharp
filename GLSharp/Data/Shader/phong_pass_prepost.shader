<?xml version="1.0" encoding="UTF-8"?>
<shader name="Test">

  <uniform>uSDiffuse</uniform>
  <uniform>uSPosition</uniform>
  <uniform>uSNormal</uniform>
  <uniform>uSAccumulation</uniform>
  
  <attribute>aVertexPosition</attribute>
  
    <vertex_shader>
        <![CDATA[
		/*vertex position*/
        attribute vec3 aVertexPosition;
		
		/*texture samplers*/
		uniform sampler2D uSDiffuse;
		uniform sampler2D uSPosition;
		uniform sampler2D uSNormal;
		uniform sampler2D uSAccumulation;
		
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
		uniform sampler2D uSDiffuse;
		uniform sampler2D uSPosition;
		uniform sampler2D uSNormal;
		uniform sampler2D uSAccumulation;

        void main(void) {		
			vec4 color = texture2D(uSDiffuse, vTexCoord);
			vec4 position = texture2D(uSPosition, vTexCoord);
			vec4 normal = texture2D(uSNormal, vTexCoord);
			vec4 acc = texture2D(uSAccumulation, vTexCoord);
			
			/*depth*
			//gl_FragColor = vec4(-position.z / 100.0, -position.z / 100.0, -position.z / 100.0, 1.0);
			
			/*multiplicative diffuse*/
			/*gl_FragColor = vec4(color.x * acc.x + color.x * 0.05, 
				color.y * acc.y + color.y * 0.1,
				color.z * acc.z + color.z * 0.2, 1.0);*/
			
			/*SSAO*/
			//gl_FragColor = vec4(ao * acc.z, ao * acc.z, ao * acc.z, 1.0);
			//gl_FragColor = vec4(ao, ao, ao, 1.0);
			
			/*SSAO + diffuse*/
			gl_FragColor = vec4(
				(color.x * acc.x + color.x * 0.2), 
				(color.y * acc.y + color.y * 0.4),
				(color.z * acc.z + color.z * 0.5), 1.0);
			//gl_FragColor = vec4(position.xy * 0.025 + 0.5, position.z / 100.0, 1.0);
			//gl_FragColor = acc;
        }
        ]]>
    </fragment_shader>
</shader>