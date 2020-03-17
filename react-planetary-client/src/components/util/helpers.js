import * as THREE from "three";


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
