import React, { useEffect } from "react";
import * as THREE from "three";
import { galaxy_function, createEarth } from "./util/helpers";

export default function Earth(props) {
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
    let spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);

    // Texture Loader
    let textureLoader = new THREE.TextureLoader();

    let earth = createEarth(camera, {
      surface: {
        size: props.size || .5,
        material: {
          bumpScale: 0.05,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg",
          bumpMap:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthbump1k.jpg",
          specularMap:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg"
        }
      },
      atmosphere: {
        size: 0.003,
        material: {
          opacity: 0.8
        },
        textures: {
          map:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg",
          alphaMap:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg"
        },
        glow: {
          size: 0.02,
          intensity: 0.7,
          fade: 7,
          color: 0x93cfef
        }
      }
    });

    galaxy_function(textureLoader, scene);

    // Scene, Camera, Renderer Configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(1, 1, 1);

    scene.add(camera);
    scene.add(spotLight);
    scene.add(earth);

    // Light Configurations
    spotLight.position.set(2, 0, 1);

    // Mesh Configurations
    earth.receiveShadow = true;
    earth.castShadow = true;
    earth.getObjectByName("surface").geometry.center();

    // On window resize, adjust camera aspect ratio and renderer size
    window.addEventListener("resize", function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Main render function
    let render = function() {
      earth.getObjectByName("surface").rotation.y += (1 / 32) * 0.01;
      earth.getObjectByName("atmosphere").rotation.y += (1 / 6) * 0.01;
      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(earth.position);
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