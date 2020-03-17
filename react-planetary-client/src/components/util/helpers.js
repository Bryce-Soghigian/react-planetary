import * as THREE from "three";

/**
 * @description Adds a moving galaxy to your scene
 * @param {*} textureLoader pass it your current texture loader
 * @param {*} scene pass it whatever you call your threejs scene
 */

 /*
 =================================================================
=================================================================
=================================================================
=================================================================
=================================================================
=================================================================
=================================================================
=================================================================
=================================================================
=================================================================
 */
export const galaxy_function = (textureLoader,scene) => {

    let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
    let galaxyMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide
    });
    let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
    
    // Load Galaxy Textures
    textureLoader.crossOrigin = true;
    textureLoader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
      function(texture) {
        galaxyMaterial.map = texture;
        scene.add(galaxy);
      }
    );
    
  }






/**
 * 
 * @description Optimized function of something i found on codepen
 */

export const createBasicPlanet = function(options) {

    //Planet prototype
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



  


/**
 * 
 * @param {*} camera your threejs camera
 * @param {*} options options for the planet
 */
  export let createEarth = function(camera, options) {
    // Create the planet's Surface
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
      glowMaterial: function(intensity, fade, color) {
        // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
        let glowMaterial = new THREE.ShaderMaterial({
          uniforms: { 
            'c': {
              type: 'f',
              value: intensity
            },
            'p': { 
              type: 'f',
              value: fade
            },
            glowColor: { 
              type: 'c',
              value: new THREE.Color(color)
            },
            viewVector: {
              type: 'v3',
              value: camera.position
            }
          },
          vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main() {
              vec3 vNormal = normalize( normalMatrix * normal );
              vec3 vNormel = normalize( normalMatrix * viewVector );
              intensity = pow( c - dot(vNormal, vNormel), p );
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`
          ,
          fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() 
            {
              vec3 glow = glowColor * intensity;
              gl_FragColor = vec4( glow, 1.0 );
            }`
          ,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });
        
        return glowMaterial;
      },
      texture: function(material, property, uri) {
        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load(
          uri,
          function(texture) {
            material[property] = texture;
            material.needsUpdate = true;
          }
        );
      }
    };
    let surfaceGeometry = planetProto.sphere(options.surface.size);
    let surfaceMaterial = planetProto.material(options.surface.material);
    let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    
    // Create the planet's Atmosphere
    let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
    let atmosphereMaterialDefaults = {
      side: THREE.DoubleSide,
      transparent: true
    }
    let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
    let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
    let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    
    // Create the planet's Atmospheric glow
    let atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
    let atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
    let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);
  //Merge into one object  
    let planet = new THREE.Object3D();
    surface.name = 'surface';
    atmosphere.name = 'atmosphere';
    atmosphericGlow.name = 'atmosphericGlow';
    planet.add(surface);
    planet.add(atmosphere);
    planet.add(atmosphericGlow);
  
    // Load the Surface's textures
    for (let textureProperty in options.surface.textures) {
      planetProto.texture(
        surfaceMaterial,
        textureProperty,
        options.surface.textures[textureProperty]
      ); 
    }
    for (let textureProperty in options.atmosphere.textures) {
      planetProto.texture(
        atmosphereMaterial,
        textureProperty,
        options.atmosphere.textures[textureProperty]
      );
    }
    
    return planet;
  };
  