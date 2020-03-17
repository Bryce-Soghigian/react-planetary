import React, { useEffect } from "react";
import * as THREE from "three";

export default function Moon() {
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

    // Planet proto
    let planetProto = {
      sphere: function(size) {
        let sphere = new THREE.SphereGeometry(size, 32, 32);

        return sphere;
      },
      material: function(options) {
        let material = new THREE.MeshPhongMaterial();
        if (options) {
          for (var property in options) {
            material[property] = options[property];
          }
        }

        return material;
      },

      texture: function(material, property, uri) {
        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load(uri, function(texture) {
          material[property] = texture;
          material.needsUpdate = true;
        });
      }
    };
    //Found function on codepen
    let createPlanet = function(options) {
      // Create the planet's Surface
      let surfaceGeometry = planetProto.sphere(options.surface.size);
      let surfaceMaterial = planetProto.material(options.surface.material);
      let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

      //Merge into one object
      let planet = new THREE.Object3D();
      surface.name = "surface";
      planet.add(surface);

      // Load the Surface's textures
      for (let textureProperty in options.surface.textures) {
        planetProto.texture(
          surfaceMaterial,
          textureProperty,
          options.surface.textures[textureProperty]
        );
      }

      return planet;
    };

    let earth = createPlanet({
      surface: {
        size: 0.5,
        material: {
          bumpScale: 0.009,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map:
            "https://i.imgur.com/iGN6Rd7.jpg",
          bumpMap:
            "https://i.imgur.com/OQu9jBK.jpg"
        }
      }
    });

    // Galaxy
    let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
    let galaxyMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide
    });
    let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

    // Load Galaxy Textures
    textureLoader.crossOrigin = true;
    textureLoader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png",
      function(texture) {
        galaxyMaterial.map = texture;
        scene.add(galaxy);
      }
    );

    // Scene, Camera, Renderer Configuration
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(1, 1, 1);

    scene.add(camera);
    scene.add(earth);

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
  }, []);
  return <div></div>;
}
