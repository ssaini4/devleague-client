<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

  export let width = "";
  export let height = "";
  export const backgroundColor = 0x222222;
  export let imageUrl: string;

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let container: HTMLElement;
  let currentMesh: THREE.Mesh | null = null;

  // Setup scene, camera, renderer, and lights
  function initScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Add a brighter backlight
    const backLight = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
    backLight.position.set(0, -10, 0); // Position it behind the scene
    scene.add(backLight);

    // Add OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.minPolarAngle = Math.PI / 2 - Math.PI / 18;
    controls.maxPolarAngle = Math.PI / 2 + Math.PI / 18;
    controls.minAzimuthAngle = -Math.PI / 18;
    controls.maxAzimuthAngle = Math.PI / 18;
    controls.enableZoom = false; // Disable zoom
    controls.enablePan = false; // Enable panning
    controls.panSpeed = 1.0; // Adjust pan speed as needed
    if (window.innerWidth >= 768) {
      camera.position.z = 9;
    } else {
      camera.position.z = 10;
    }
  }

  // Load and setup the image
  function loadImage(url: string) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, (texture) => {
      // Use mipmaps for better scaling on different devices
      texture.generateMipmaps = true;
      // Apply different texture settings for desktop
      if (window.innerWidth >= 768) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
      } else {
        texture.minFilter = THREE.LinearMipmapLinearFilter; // Use nearest neighbor filtering for sharp pixels
        // texture.magFilter = THREE.LinearFilter; // Use nearest neighbor filtering for sharp pixels
        // texture.generateMipmaps = false; // Disable mipmaps to prevent blurring
        // texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // Keep max anisotropy for viewing angles
      }

      // Apply anisotropic filtering for smoother textures
      // const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
      // texture.anisotropy = Math.max(maxAnisotropy, 20);

      // Remove existing mesh if it exists
      if (currentMesh) {
        scene.remove(currentMesh);
      }

      // Create procedural dots texture
      const noiseSize = 256;
      const noiseData = new Uint8Array(noiseSize * noiseSize);
      const dotSpacing = 8; // Increased spacing to reduce noise
      const dotSize = 0.5; // Reduced size to make dots smaller

      for (let y = 0; y < noiseSize; y++) {
        for (let x = 0; x < noiseSize; x++) {
          const index = y * noiseSize + x;
          if (x % dotSpacing === 0 && y % dotSpacing === 0) {
            // Create a dot
            for (let dy = 0; dy < dotSize; dy++) {
              for (let dx = 0; dx < dotSize; dx++) {
                const dotIndex = (y + dy) * noiseSize + (x + dx);
                if (dotIndex < noiseData.length) {
                  noiseData[dotIndex] = 25; // Dot intensity
                }
              }
            }
          } else {
            noiseData[index] = 0; // Background
          }
        }
      }

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.encoding = THREE.sRGBEncoding;

      const geometry = new THREE.PlaneGeometry(4, 5.5);
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: false,
        shininess: 90,
        specular: 0xf0f0f0,
        alphaTest: 0.25,
        displacementScale: 0.005, // Very subtle displacement
      });

      // Adjust material properties for better color rendering
      material.toneMapped = false;

      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, 0);
      scene.add(plane);
      currentMesh = plane;
    });
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer?.render(scene, camera);
  }

  function onMouseMove(event: MouseEvent) {
    const rect = container.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width;
    const mouseY = (event.clientY - rect.top) / rect.height;

    // Calculate direction from center to cursor
    const directionX = (mouseX - 0.5) * 2; // Range from -1 to 1
    const directionY = (mouseY - 0.5) * 2; // Range from -1 to 1

    if (currentMesh) {
      // Update rotation based on cursor movement with a maximum of 15 degrees (0.2618 radians)
      currentMesh.rotation.y = directionX * 0.1618; // Yaw
      currentMesh.rotation.x = directionY * 0.1618; // Pitch
      // Optionally, you can add roll by adjusting rotation.z
      // currentMesh.rotation.z = someValue; // Roll
    }
  }

  onMount(() => {
    initScene();
    loadImage(imageUrl);
    animate();

    // Add mouse move event listener
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      // Cleanup
      window.removeEventListener("mousemove", onMouseMove);
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  });

  // React to imageUrl changes
  $: if (scene && imageUrl) {
    loadImage(imageUrl);
  }
</script>

<div bind:this={container} style="width: {width}; height: {height};"></div>
