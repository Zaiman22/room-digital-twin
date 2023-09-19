import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import * as dat from 'dat.gui';

var state = false;

// create scene
const scene = new THREE.Scene();

//create camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth /window.innerHeight, 0.1, 1000);

//#region Setting renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
//#endregion

// setup render for scene and camera
renderer.render(scene,camera);

// add control for 3d camera movement
const controls = new OrbitControls(camera,renderer.domElement);

//#region import 3d object from stl
let gear1,gear2,motor

// gear 1
//for rotation
const pivot = new THREE.Object3D();
const loader = new STLLoader();
loader.load('resc/3d_model/gear first tengah.stl', function (geometry) {
  const material = new THREE.MeshNormalMaterial();
  gear1 = new THREE.Mesh(geometry, material);
  gear1.scale.set(0.2,0.2,0.2);

  const box = new THREE.Box3( ).setFromObject( gear1 );
  const c = box.getCenter( new THREE.Vector3( ) );
	const size = box.getSize( new THREE.Vector3( ) );
	gear1.position.set( -c.x, size.y / 2 - c.y, -c.z );  // put // in front of this line, try it out 
	pivot.add( gear1 ); 
	pivot.position.set( 0, 0, 0 );
	scene.add( pivot );
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
)

//gear 2

const pivot1 = new THREE.Object3D();
loader.load('resc/3d_model/gear secondo motor.STL', function (geometry) {
  const material = new THREE.MeshNormalMaterial();
  gear2 = new THREE.Mesh(geometry, material);
  gear2.scale.set(0.2,0.2,0.2);

  const box = new THREE.Box3( ).setFromObject( gear2 );
  const c = box.getCenter( new THREE.Vector3( ) );
	const size = box.getSize( new THREE.Vector3( ) );
	gear2.position.set( -c.x, size.y / 2 - c.y, -c.z );  // put // in front of this line, try it out 
	pivot1.add( gear2 ); 
  pivot1.rotation.y = Math.PI/9;
	pivot1.position.set( 11,0, 0 );

	scene.add( pivot1 );
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
)
//#endregion


const ambientlight = new THREE.AmbientLight(0xfffff);

scene.add(ambientlight);

const gridhelper = new THREE.GridHelper(200,200);
scene.add(gridhelper);



function animate(){
  requestAnimationFrame(animate);
  if (gear1 &&gear2 && state == true) {
    const rotate_speed = -0.01;
    pivot.rotation.y += rotate_speed;
    pivot1.rotation.y += rotate_speed/-11*24;
  }
  controls.update;
  renderer.render(scene,camera);
}


animate();

//#region Setup GUI
function setupGUI() {
  var gui = new dat.GUI();

  var params = {
    showAlert: function() {
      alert(params.message);
    },
    // Add a button property
    clickMe: function() {
      if(state == false){
        state = true;

      }
      console.log(state);
    }
  };

  // Add the button to the GUI
  gui.add(params, 'clickMe').name('Start'); // 'name' sets the button label
}

setupGUI();
//#endregion
