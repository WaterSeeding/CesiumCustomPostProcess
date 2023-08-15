# Cesium 中的 PostProcessStageLibrary 库介绍(2) - 自定义PostProcessStage后期处理

> Cesium.js 的 PostProcessStageLibrary 是一个用于创建和应用后期处理效果的库。
> Cesium.js 不仅内置相应的后期处理效果，也提供了相应API和属性，方便用户自定义PostProcessStage后期处理。
> 以下是我整理记录的相关资料，帮助自己更好地接收了解 Cesium 中的后期处理(Post Processing)。
> 
> - [查看地址](https://cesium-custom-post-process.vercel.app/)
> - [仓库地址](https://github.com/WaterSeeding/CesiumCustomPostProcess)

<br />

## PostProcessStage介绍

> PostProcessStage（后处理阶段）是一个用于图形后处理的组件。

![后期处理](./md/Cesium场景的PostProcessStageLibrary/1.gif)

在Cesium.js中，PostProcessStageLibrary和PostProcessStage之间存在一种依赖关系。
简单来说，PostProcessStageLibrary是一个库，它提供了一些预定义的后处理效果和处理步骤，而PostProcessStage是用于创建和应用后处理效果的组件。

[PostProcessStageLibrary提供了一系列预定义的后处理效果（如模糊、颜色校正、辉光等），这些效果都是通过内置的片段着色器实现的。
这些预定义的效果可以直接在应用中使用，无需编写自定义的片段着色器。](https://juejin.cn/post/7267091417029476413)

PostProcessStage则是用于创建自定义的后处理阶段的组件。
使用PostProcessStage，开发人员可以编写自己的片段着色器来实现特定的图形处理操作或创建自定义的后处理效果。

因此，开发人员可以根据自己的需求和创意来定制后处理效果:

```tsx
// 引入PostProcessStageLibrary
let PostProcessStageLibrary = Cesium.PostProcessStageLibrary;

// 创建一个PostProcessStageLibrary库内置后处理阶段
let libraryPostProcessStage = new Cesium.PostProcessStage({
  name: 'libraryPostProcessStage',
  fragmentShader: PostProcessStageLibrary.createSepiaStage()
});

// 将PostProcessStageLibrary库内置后处理阶段添加到场景中
viewer.scene.postProcessStages.add(libraryPostProcessStage);

// 创建一个自定义后处理阶段
let customPostProcessStage = new Cesium.PostProcessStage({
  name: 'customPostProcessStage',
  fragmentShader: PostProcessStageLibrary.createSepiaStage()
});

// 将自定义后处理阶段添加到场景中
viewer.scene.postProcessStages.add(customPostProcessStage);
```

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)