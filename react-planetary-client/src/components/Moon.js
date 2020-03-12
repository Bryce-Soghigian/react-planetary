import React,{useEffect} from 'react'
import * as THREE from 'three'

export default function Moon() {
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
    var texture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/Bryce-Soghigian/react-planetary/master/react-planetary-client/src/components/images/moonmap1k.jpg?token=AL3OIQWS4NDUTPXBVL2NT426OPXDU' );
    var geometry = new THREE.SphereGeometry(0.3, 32, 32);
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    camera.position.z = 5;
    var animate = function() {
      requestAnimationFrame(animate);
    //   mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    }, [])
    return (
        <div>
            
        </div>
    )
}
