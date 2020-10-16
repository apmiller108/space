<template>
  <div id="neo" ref="neo" />
</template>

<script>
import * as THREE from "three";

export default {
  name: "NearEarthObjects",
  mounted() {
    // setup the scene, camera and render
    const scene = new THREE.Scene();

    const fov = 40;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      near,
      far
    );
    camera.position.z = 120;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.neo.appendChild(renderer.domElement);

    // Create geometry, add to scene and move camera
    const radius = 5;
    const widthSegments = 32;
    const heightSegments = 32;
    const geometry = new THREE.SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const material = new THREE.MeshBasicMaterial({
      color: "#FAF194",
      flatShading: false
    });
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);

    const color = "#FFFFFF";
    const intensity = 2;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(0, 0, 0);
    scene.add(light);

    {
      const radius = 1;
      const widthSegments = 12;
      const heightSegments = 12;
      const geometry = new THREE.SphereBufferGeometry(
        radius,
        widthSegments,
        heightSegments
      );
      const material = new THREE.MeshPhongMaterial({
        color: "#B1B3B8",
        flatShading: false
      });
      const mercury = new THREE.Mesh(geometry, material);
      mercury.position.set(15, 0, 0);
      scene.add(mercury);
    }

    // animate the scene
    function animate() {
      requestAnimationFrame(animate);
      sun.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }
};
</script>

<style lang="scss"></style>
