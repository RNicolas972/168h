import * as THREE from 'three/build/three.module'
import { GLTFLoader } from './js/GLTFLoader'



// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);


function App() {
  const loader = new GLTFLoader();

  const scene = new THREE.Scene();
  //const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);

  let hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  loader.load('models/scene.gltf',
    // called when resource is loaded
    function (object) {
      scene.add(object)
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened');
      console.log(error)
    }
  );

  return null;
};

export default App;
