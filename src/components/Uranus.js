import React,{useEffect} from 'react'
import * as THREE from 'three'
import {galaxy_function,createBasicPlanet} from './util/helpers'
export default function Uranus() {
    useEffect(() => {
        let renderer = new THREE.WebGLRenderer();
        let scene = new THREE.Scene();
        let aspect = window.innerWidth / window.innerHeight;
        let camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
        let cameraRotation = 0;
        let cameraRotationSpeed = 0.001;
        let cameraAutoRotation = true;
    
    
        // Lights
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0, 96, 255);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);
        let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
        scene.add(hemiLightHelper);
    
        // Texture Loader
        let textureLoader = new THREE.TextureLoader();
    
        let uranus = createBasicPlanet({
          surface: {
            size: 0.5,
            material: {
              bumpScale: 0.0,
              specular: new THREE.Color("grey"),
              shininess: 10
            },
            textures: {
              map: "https://i.imgur.com/ApBJDsX.jpg",
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
        var ring_geometry = new THREE.RingGeometry(.5,.75,32);
        var ring_texture = textureLoader.load("https://i.imgur.com/i5b6WxT.jpg")
        let ring_material = new THREE.MeshBasicMaterial(  {map: ring_texture},{side:THREE.DoubleSide });
        var ring_mesh = new THREE.Mesh(ring_geometry, ring_material);
        ring_mesh.rotateX( Math.PI / 9 );
        // ring_mesh.rotateX(-Math.PI/3)
        uranus.rotateX(Math.PI/1)
        camera.position.set(1, 1, 1);
        scene.add(ring_mesh)
        scene.add(camera);
        scene.add(uranus);
    
    
        // Mesh Configurations
        uranus.receiveShadow = true;
        uranus.castShadow = true;
        uranus.getObjectByName("surface").geometry.center();
    
        // On window resize, adjust camera aspect ratio and renderer size
        window.addEventListener("resize", function() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
    
        // Main render function
        let render = function() {
          uranus.rotation.y += (1 / 2) * 0.01;
    
          if (cameraAutoRotation) {
            cameraRotation += cameraRotationSpeed;
            camera.position.y = 0;
            camera.position.x = 2 * Math.sin(cameraRotation);
            camera.position.z = 2 * Math.cos(cameraRotation);
            camera.lookAt(uranus.position);
    
    
          }
          requestAnimationFrame(render);
          renderer.render(scene, camera);
        };
    
        render();
        return () => {
            document.body.removeChild( renderer.domElement );
        };
    }, [])
    return (
        <div>
            
        </div>
    )
}
