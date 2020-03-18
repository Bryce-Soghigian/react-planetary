import React, { useEffect } from "react";
import * as THREE from "three";
import {createBasicPlanet,galaxy_function} from './util/helpers'

export default function Mars(props) {
  useEffect(() => {
    // Scene, Camera, Renderer
    let renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let aspect = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    let cameraRotation = 0;
    let cameraRotationSpeed = 0.001;
    let cameraAutoRotation = true;

    // Lights
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

    // Texture Loader
    let textureLoader = new THREE.TextureLoader();



    let mars = createBasicPlanet({
      surface: {
        size: props.size || .4,
        material: {
          bumpScale: 0.05,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map:
            "https://i.imgur.com/xu5OXIB.jpg",
          bumpMap:
            "https://i.imgur.com/VEjn3Pm.jpg"
        }
      }
    });

    // Galaxy
    galaxy_function(textureLoader,scene)

    // Scene, Camera, Renderer Configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(1, 1, 1);

    scene.add(camera);
    scene.add(mars);

    // Mesh Configurations
    mars.receiveShadow = true;
    mars.castShadow = true;
    mars.getObjectByName("surface").geometry.center();

    // On window resize, adjust camera aspect ratio and renderer size
    window.addEventListener("resize", function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Main render function
    let render = function() {
      mars.getObjectByName("surface").rotation.y += (1 / 32) * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(mars.position);
      }
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return () => {
      document.body.removeChild( renderer.domElement );
  };
  }, [props]);
  return <div></div>;
}
