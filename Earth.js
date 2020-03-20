"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Earth;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Earth(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var earth = (0, _helpers.createEarth)(camera, {
      surface: {
        size: props.size || .5,
        material: {
          bumpScale: 0.05,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg",
          bumpMap: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthbump1k.jpg",
          specularMap: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg"
        }
      },
      atmosphere: {
        size: 0.003,
        material: {
          opacity: 0.8
        },
        textures: {
          map: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg",
          alphaMap: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg"
        },
        glow: {
          size: 0.02,
          intensity: 0.7,
          fade: 7,
          color: 0x93cfef
        }
      }
    });
    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(spotLight);
    scene.add(earth); // Light Configurations

    spotLight.position.set(2, 0, 1); // Mesh Configurations

    earth.receiveShadow = true;
    earth.castShadow = true;
    earth.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      earth.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;
      earth.getObjectByName("atmosphere").rotation.y += 1 / 6 * 0.01;

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
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props]);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Jupiter;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Jupiter(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var jupiter = (0, _helpers.createBasicPlanet)({
      surface: {
        size: props.size || 0.5,
        material: {
          bumpScale: 0.000,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/qUzuQr6.jpg",
          bumpMap: ""
        }
      }
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(jupiter); // Mesh Configurations

    jupiter.receiveShadow = true;
    jupiter.castShadow = true;
    jupiter.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      jupiter.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(jupiter.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props]);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mars;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Mars(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var mars = (0, _helpers.createBasicPlanet)({
      surface: {
        size: props.size || .4,
        material: {
          bumpScale: 0.05,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/xu5OXIB.jpg",
          bumpMap: "https://i.imgur.com/VEjn3Pm.jpg"
        }
      }
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(mars); // Mesh Configurations

    mars.receiveShadow = true;
    mars.castShadow = true;
    mars.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      mars.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(mars.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props]);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mercury;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Mercury(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var mercury = (0, _helpers.createBasicPlanet)({
      surface: {
        size: props.size || 0.3,
        material: {
          bumpScale: 0.005,
          specular: new THREE.Color("red"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/yCk1mZQ.jpg",
          bumpMap: "https://i.imgur.com/7wqmsEi.jpg"
        }
      }
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(mercury); // Mesh Configurations

    mercury.receiveShadow = true;
    mercury.castShadow = true;
    mercury.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      mercury.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(mercury.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props]);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Moon;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Moon(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var moon = (0, _helpers.createBasicPlanet)({
      surface: {
        size: props.size || 0.5,
        material: {
          bumpScale: 0.009,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/iGN6Rd7.jpg",
          bumpMap: "https://i.imgur.com/OQu9jBK.jpg"
        }
      }
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(moon); // Mesh Configurations

    moon.receiveShadow = true;
    moon.castShadow = true;
    moon.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      moon.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(moon.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props]);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Neptune;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Neptune(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var neptune = (0, _helpers.createBasicPlanet)({
      surface: {
        size: props.size || 0.5,
        material: {
          bumpScale: 0.000,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/tnBFfhT.jpg",
          bumpMap: ""
        }
      }
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(neptune); // Mesh Configurations

    neptune.receiveShadow = true;
    neptune.castShadow = true;
    neptune.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      neptune.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(neptune.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props]);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Saturn;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Saturn() {
  (0, _react.useEffect)(function () {
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var saturn = (0, _helpers.createBasicPlanet)({
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
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); //Ring configuration

    var ring_geometry = new THREE.TorusGeometry(.7, .06, 10, 100);
    var ring_texture = textureLoader.load("https://i.imgur.com/MoOoKkt.jpg");
    var ring_material = new THREE.MeshBasicMaterial({
      map: ring_texture
    }, {
      side: THREE.DoubleSide
    });
    var ring_mesh = new THREE.Mesh(ring_geometry, ring_material); // ring_mesh.rotateX( Math.PI / 2 );

    ring_mesh.rotateX(-Math.PI / 3);
    saturn.rotateX(Math.PI / 1);
    camera.position.set(1, 1, 1);
    scene.add(ring_mesh);
    scene.add(camera);
    scene.add(saturn); // Mesh Configurations

    saturn.receiveShadow = true;
    saturn.castShadow = true;
    saturn.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      saturn.rotation.y += 1 / 2 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(saturn.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return _react.default.createElement("div", null);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Sun;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Sun() {
  useEffect(function () {// sunSphere = new THREE.Mesh(
    //     new THREE.SphereBufferGeometry( 20000, 16, 8 ),
    //     new THREE.MeshBasicMaterial( { color: 0xE8C67E } )
    // );
    // sunSphere.position.y = - 700000;
    // sunSphere.visible = false;
    // scene.add( sunSphere );
  }, []);
  return _react.default.createElement("div", null, "Coming Soon?");
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Uranus;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Uranus() {
  (0, _react.useEffect)(function () {
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0, 96, 255);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var uranus = (0, _helpers.createBasicPlanet)({
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
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); //Ring configuration

    var ring_geometry = new THREE.RingGeometry(.5, .75, 32);
    var ring_texture = textureLoader.load("https://i.imgur.com/i5b6WxT.jpg");
    var ring_material = new THREE.MeshBasicMaterial({
      map: ring_texture
    }, {
      side: THREE.DoubleSide
    });
    var ring_mesh = new THREE.Mesh(ring_geometry, ring_material);
    ring_mesh.rotateX(Math.PI / 9); // ring_mesh.rotateX(-Math.PI/3)

    uranus.rotateX(Math.PI / 1);
    camera.position.set(1, 1, 1);
    scene.add(ring_mesh);
    scene.add(camera);
    scene.add(uranus); // Mesh Configurations

    uranus.receiveShadow = true;
    uranus.castShadow = true;
    uranus.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      uranus.rotation.y += 1 / 2 * 0.01;

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
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return _react.default.createElement("div", null);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Venus;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("three"));

var _helpers = require("./util/helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Venus(props) {
  (0, _react.useEffect)(function () {
    // Scene, Camera, Renderer
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    var cameraRotation = 0;
    var cameraRotationSpeed = 0.001;
    var cameraAutoRotation = true; // Lights

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    var hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper); // Texture Loader

    var textureLoader = new THREE.TextureLoader();
    var venus = (0, _helpers.createBasicPlanet)({
      surface: {
        size: props.size || 0.5,
        material: {
          bumpScale: 0.009,
          specular: new THREE.Color("grey"),
          shininess: 10
        },
        textures: {
          map: "https://i.imgur.com/QxHasVS.jpg",
          bumpMap: "https://i.imgur.com/5Zry4Tw.jpg"
        }
      }
    }); // Galaxy

    (0, _helpers.galaxy_function)(textureLoader, scene); // Scene, Camera, Renderer Configuration

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set(1, 1, 1);
    scene.add(camera);
    scene.add(venus); // Mesh Configurations

    venus.receiveShadow = true;
    venus.castShadow = true;
    venus.getObjectByName("surface").geometry.center(); // On window resize, adjust camera aspect ratio and renderer size

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }); // Main render function

    var render = function render() {
      venus.getObjectByName("surface").rotation.y += 1 / 32 * 0.01;

      if (cameraAutoRotation) {
        cameraRotation += cameraRotationSpeed;
        camera.position.y = 0;
        camera.position.x = 2 * Math.sin(cameraRotation);
        camera.position.z = 2 * Math.cos(cameraRotation);
        camera.lookAt(venus.position);
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    return function () {
      document.body.removeChild(renderer.domElement);
    };
  }, [props.size]);
  return _react.default.createElement("div", null);
}
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
