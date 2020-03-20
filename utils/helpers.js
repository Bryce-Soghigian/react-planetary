"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEarth = exports.createBasicPlanet = exports.galaxy_function = void 0;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @description Adds a moving galaxy to your scene
 * @param {*} textureLoader pass it your current texture loader
 * @param {*} scene pass it whatever you call your threejs scene
 */
var galaxy_function = function galaxy_function(textureLoader, scene) {
  var galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
  var galaxyMaterial = new THREE.MeshBasicMaterial({
    side: THREE.BackSide
  });
  var galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial); // Load Galaxy Textures

  textureLoader.crossOrigin = true;
  textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png', function (texture) {
    galaxyMaterial.map = texture;
    scene.add(galaxy);
  });
};
/**
 * 
 * @description Optimized function of something i found on codepen
 */


exports.galaxy_function = galaxy_function;

var createBasicPlanet = function createBasicPlanet(options) {
  //Planet prototype
  var planetProto = {
    sphere: function sphere(size) {
      var sphere = new THREE.SphereGeometry(size, 32, 32);
      return sphere;
    },
    material: function material(options) {
      var material = new THREE.MeshPhongMaterial();

      if (options) {
        for (var property in options) {
          material[property] = options[property];
        }
      }

      return material;
    },
    texture: function texture(material, property, uri) {
      var textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = true;
      textureLoader.load(uri, function (texture) {
        material[property] = texture;
        material.needsUpdate = true;
      });
    }
  }; // Create the planet's Surface

  var surfaceGeometry = planetProto.sphere(options.surface.size);
  var surfaceMaterial = planetProto.material(options.surface.material);
  var surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial); //Merge into one object

  var planet = new THREE.Object3D();
  surface.name = "surface";
  planet.add(surface); // Load the Surface's textures

  for (var textureProperty in options.surface.textures) {
    planetProto.texture(surfaceMaterial, textureProperty, options.surface.textures[textureProperty]);
  }

  return planet;
};
/**
 * 
 * @param {*} camera your threejs camera
 * @param {*} options options for the planet
 */


exports.createBasicPlanet = createBasicPlanet;

var createEarth = function createEarth(camera, options) {
  // Create the planet's Surface
  var planetProto = {
    sphere: function sphere(size) {
      var sphere = new THREE.SphereGeometry(size, 32, 32);
      return sphere;
    },
    material: function material(options) {
      var material = new THREE.MeshPhongMaterial();

      if (options) {
        for (var property in options) {
          material[property] = options[property];
        }
      }

      return material;
    },
    glowMaterial: function glowMaterial(intensity, fade, color) {
      // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
      var glowMaterial = new THREE.ShaderMaterial({
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
        vertexShader: "\n            uniform vec3 viewVector;\n            uniform float c;\n            uniform float p;\n            varying float intensity;\n            void main() {\n              vec3 vNormal = normalize( normalMatrix * normal );\n              vec3 vNormel = normalize( normalMatrix * viewVector );\n              intensity = pow( c - dot(vNormal, vNormel), p );\n              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n            }",
        fragmentShader: "\n            uniform vec3 glowColor;\n            varying float intensity;\n            void main() \n            {\n              vec3 glow = glowColor * intensity;\n              gl_FragColor = vec4( glow, 1.0 );\n            }",
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      return glowMaterial;
    },
    texture: function texture(material, property, uri) {
      var textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = true;
      textureLoader.load(uri, function (texture) {
        material[property] = texture;
        material.needsUpdate = true;
      });
    }
  };
  var surfaceGeometry = planetProto.sphere(options.surface.size);
  var surfaceMaterial = planetProto.material(options.surface.material);
  var surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial); // Create the planet's Atmosphere

  var atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
  var atmosphereMaterialDefaults = {
    side: THREE.DoubleSide,
    transparent: true
  };
  var atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
  var atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
  var atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial); // Create the planet's Atmospheric glow

  var atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
  var atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
  var atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial); //Merge into one object  

  var planet = new THREE.Object3D();
  surface.name = 'surface';
  atmosphere.name = 'atmosphere';
  atmosphericGlow.name = 'atmosphericGlow';
  planet.add(surface);
  planet.add(atmosphere);
  planet.add(atmosphericGlow); // Load the Surface's textures

  for (var textureProperty in options.surface.textures) {
    planetProto.texture(surfaceMaterial, textureProperty, options.surface.textures[textureProperty]);
  }

  for (var _textureProperty in options.atmosphere.textures) {
    planetProto.texture(atmosphereMaterial, _textureProperty, options.atmosphere.textures[_textureProperty]);
  }

  return planet;
};

exports.createEarth = createEarth;
