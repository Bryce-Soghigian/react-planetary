import React, { useEffect } from "react";
import * as THREE from "three";
export default function Earth() {
  useEffect(() => {
    //=========INIT=========================//
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight
    );
    var renderer = new THREE.WebGLRenderer();
    var light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(50, 50, 50);
    scene.add(light);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //===========Geometry && MESH=============
    var geometry = new THREE.SphereGeometry(0.5, 32, 32);
    var material = new THREE.MeshPhongMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //=========Textures================//
    material.map    = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg')

    camera.position.z = 5;
    var animate = function() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return <div></div>;
}
