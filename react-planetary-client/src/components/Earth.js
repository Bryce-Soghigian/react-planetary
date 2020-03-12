import React, { useEffect } from "react";
import * as THREE from "three";

export default function Earth() {
  useEffect(() => {
    //=========INIT=========================//
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight
    );
    var renderer = new THREE.WebGLRenderer();
    var light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(50, 50, 50);

    scene.add(light);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);



    //===========Geometry && MESH=============
    var texture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/Bryce-Soghigian/react-planetary/master/react-planetary-client/src/components/images/earthmap1k.jpg?token=AL3OIQXSOSGCOSEO6TH4SZS6OLTKW' );
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    material.bumpMap  =new THREE.TextureLoader().load("https://raw.githubusercontent.com/Bryce-Soghigian/react-planetary/master/react-planetary-client/src/components/images/earthbump1k%20(2).jpg?token=AL3OIQT6AVDVPUPXS6KAVWC6OLV3A")
    material.bumpScale = .5
    // material.bumpScale = 12
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // material.specular  = new THREE.Color('grey')


    camera.position.z = 5;
    var animate = function() {
      requestAnimationFrame(animate);
    //   mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return <div></div>;
}
