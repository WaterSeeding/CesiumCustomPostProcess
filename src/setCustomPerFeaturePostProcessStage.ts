import * as Cesium from "cesium";

// 简单的stage来改变被选择的颜色。
//如果czm_selected返回true，当前片段属于所选数组中的几何体。

// 为应用后处理选择的功能。
// 在片段着色器中，使用 czm_selected 确定是否应用后处理进入那个片段。
// 例如: 如果（czm_selected（v_textureCoordinates））{ //应用后处理阶段 }
// 其他 { gl_FragColor = texture2D（colorTexture，v_textureCordinates）;}

export const setCustomPerFeaturePostProcessStage = (
  viewer: Cesium.Viewer,
  gui: dat.GUI
) => {
  let fragmentShaderSource = `
    uniform sampler2D colorTexture;
    uniform vec4 highlight;
    in vec2 v_textureCoordinates;
    void main() {
      vec4 color = texture(colorTexture, v_textureCoordinates);
      if (czm_selected()) {
        vec3 highlighted = highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb;
        out_FragColor = vec4(highlighted, 1.0);
      } else { 
        out_FragColor = color;
      }
    }
  `;

  let customPerFeaturePostProcessStage = viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
      fragmentShader: fragmentShaderSource,
      uniforms: {
        highlight: new Cesium.Color(0.0, 1.0, 0.0, 0.5),
      },
    })
  );
  customPerFeaturePostProcessStage.selected = [];

  let customPerFeaturePostProcessStageUniforms = {
    show: true,
    color: "#00FF00",
  };
  let customPerFeaturePostProcessStage_folder = gui.addFolder(
    "CustomPerFeaturePostProcessStage"
  );
  customPerFeaturePostProcessStage_folder.open();

  customPerFeaturePostProcessStage_folder
    .add(customPerFeaturePostProcessStageUniforms, "show")
    .onChange((v) => {
      customPerFeaturePostProcessStage.enabled = Boolean(v);
    });

  customPerFeaturePostProcessStage_folder
    .addColor(customPerFeaturePostProcessStageUniforms, "color")
    .listen()
    .onChange((v) => {
      let color = Cesium.Color.fromCssColorString(v);
      customPerFeaturePostProcessStage.uniforms.highlight = new Cesium.Color(
        color.red,
        color.green,
        color.blue,
        0.5
      );
    });

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement: any) {
    const pickedObject = viewer.scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject)) {
      customPerFeaturePostProcessStage.selected = [pickedObject.primitive];
    } else {
      customPerFeaturePostProcessStage.selected = [];
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};
