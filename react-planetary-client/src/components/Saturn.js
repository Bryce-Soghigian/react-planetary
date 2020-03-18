import React, { useEffect } from "react";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { createBasicPlanet, galaxy_function } from "./util/helpers";
export default function Saturn() {
  useEffect(() => {
    let renderer = new THREE.WebGLRenderer();
    let scene = new THREE.Scene();
    let aspect = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    let cameraRotation = 0;
    let cameraRotationSpeed = 0.001;
    let cameraAutoRotation = true;
    let controls = new OrbitControls( camera, renderer.domElement );


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

    let saturn = createBasicPlanet({
      surface: {
        size: 0.5,
        material: {
          bumpScale: 0.0,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/tuhfOBc.jpg",
          bumpMap: ""
        }
      }
    });

    // Galaxy
    galaxy_function(textureLoader, scene);

    // Scene, Camera, Renderer Configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Ring configuration
    var ring_geometry = new THREE.TorusGeometry(.7, .06, 10, 100);
    var ring_texture = textureLoader.load("https://i.imgur.com/MoOoKkt.jpg")
    let ring_material = new THREE.MeshBasicMaterial(  {map: ring_texture},{side:THREE.DoubleSide });
    var ring_mesh = new THREE.Mesh(ring_geometry, ring_material);
    // ring_mesh.rotateX( Math.PI / 2 );
    ring_mesh.rotateX(-Math.PI/3)
    saturn.rotateX(Math.PI/1)
    camera.position.set(1, 1, 1);
    scene.add(ring_mesh)
    scene.add(camera);
    scene.add(saturn);


    // Mesh Configurations
    saturn.receiveShadow = true;
    saturn.castShadow = true;
    saturn.getObjectByName("surface").geometry.center();

    // On window resize, adjust camera aspect ratio and renderer size
    window.addEventListener("resize", function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Main render function
    let render = function() {
      saturn.rotation.y += (1 / 2) * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(saturn.position);


      }
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };

    render();
  }, []);

  return <div></div>;
}
