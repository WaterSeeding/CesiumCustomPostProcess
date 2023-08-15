import * as Cesium from "cesium";

export const setCustomPostProcessStage = (
  viewer: Cesium.Viewer,
  gui: dat.GUI
) => {
  let fragmentShaderSource = `
    uniform sampler2D colorTexture;
    uniform int KERNEL_WIDTH;  
    in vec2 v_textureCoordinates;
    void main(void) { 
      vec2 step = czm_pixelRatio / czm_viewport.zw; 
      vec2 integralPos = v_textureCoordinates - mod(v_textureCoordinates, 8.0 * step); 
      vec3 averageValue = vec3(0.0); 
      for (int i = 0; i < KERNEL_WIDTH; i++) { 
        for (int j = 0; j < KERNEL_WIDTH; j++) { 
          averageValue += texture(colorTexture, integralPos + step * vec2(i, j)).rgb; 
        } 
      } 
      averageValue = averageValue / float(KERNEL_WIDTH * KERNEL_WIDTH); 
      out_FragColor = vec4(averageValue, 1.0); 
    }
  `;

  let customPostProcessStage = viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
      fragmentShader: fragmentShaderSource,
      uniforms: {
        KERNEL_WIDTH: 16,
      },
    })
  );

  let customPostProcessStage_folder = gui.addFolder("CustomPostProcessStage");
  customPostProcessStage_folder.open();

  let customPostProcessStageUniforms = {
    show: true,
    KERNEL_WIDTH: 16,
  };

  customPostProcessStage_folder
    .add(customPostProcessStageUniforms, "show")
    .onChange((v) => {
      customPostProcessStage.enabled = Boolean(v);
    });

  customPostProcessStage_folder
    .add(customPostProcessStageUniforms, "KERNEL_WIDTH")
    .name("KERNEL_WIDTH")
    .min(1)
    .max(100)
    .step(1)
    .onChange((v) => {
      customPostProcessStage.uniforms.KERNEL_WIDTH = Number(v);
    });
};
