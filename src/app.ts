import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import SkyBoxOnGround from "./SkyBoxOnGround/index";
import Camera from "./Camera/index";
import { setCustomPostProcessStage } from "./setCustomPostProcessStage";
import { setCustomPerFeaturePostProcessStage } from "./setCustomPerFeaturePostProcessStage";

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
  "2023-08-14T11:00:00Z"
);

viewer.scene.skyAtmosphere.show = false;
viewer.scene.postProcessStages.fxaa.enabled = true;

const camera = new Camera(
  viewer,
  gui,
  {
    position: {
      longitude: -123.074338,
      latitude: 44.050324,
      height: 2,
    },
    headingPitchRoll: {
      heading: 292.944249,
      pitch: -10.969488,
      roll: 0.000143,
    },
  },
  true
);

const skyBox = new SkyBoxOnGround(
  viewer,
  gui,
  {
    show: true,
    sourcesType: "day1",
    sourcesList: [
      {
        name: "day1",
        sources: {
          positiveX: "./static/skybox/skys/rightav9.jpg",
          negativeX: "./static/skybox/skys/leftav9.jpg",
          positiveY: "./static/skybox/skys/frontav9.jpg",
          negativeY: "./static/skybox/skys/backav9.jpg",
          positiveZ: "./static/skybox/skys/topav9.jpg",
          negativeZ: "./static/skybox/skys/bottomav9.jpg",
        },
      },
    ],
  },
  true
);

(() => {
  let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706);
  let url = "./static/model/Cesium_Man.glb";
  viewer.entities.add({
    name: url,
    position: position,
    model: {
      uri: url,
      scale: 1,
    },
  });

  setCustomPostProcessStage(viewer, gui);
  setCustomPerFeaturePostProcessStage(viewer, gui);
})();
