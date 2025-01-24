<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

  export let modelUrl = ""; // URL to your FBX file
  export let backgroundColor = 0x2a2a2a;
  export let width = "100%";
  export let height = "400px";

  let container;
  let scene, camera, renderer, controls;
  let model;

  const init = () => {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Setup camera
    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Load FBX model
    const loader = new FBXLoader();
    loader.load(
      modelUrl,
      (fbx) => {
        model = fbx;

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scale model to fit view
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        model.scale.multiplyScalar(scale);

        scene.add(model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading FBX:", error);
      }
    );
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls?.update();
    renderer?.render(scene, camera);
  };

  const handleResize = () => {
    if (camera && renderer && container) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  };

  onMount(() => {
    init();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scene?.dispose();
      renderer?.dispose();
    };
  });
</script>

<div bind:this={container} style="width: {width}; height: {height};" />

<style>
  div {
    position: relative;
  }
</style>
