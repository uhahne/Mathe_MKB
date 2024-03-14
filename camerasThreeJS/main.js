import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const fixedScreenSize = 800;
var canvasSizeIsFixed = true;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = canvasSizeIsFixed ? 1.0 : SCREEN_WIDTH / SCREEN_HEIGHT;
let doAnimate = false;

const scene = new THREE.Scene();
// camera parameters
const left = -1 * aspect;
const right = 1 * aspect;
const top = 1;
const bottom = -1;
const near = 1;
const far = 4;
const cameraOrtho = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
const fovy = 90;
const cameraPerspective = new THREE.PerspectiveCamera(fovy, aspect, near, far);
setupCamera(cameraPerspective);
setupCamera(cameraOrtho);

let camera = cameraPerspective;


const renderer = new THREE.WebGLRenderer();
if (canvasSizeIsFixed) {
    renderer.setSize(fixedScreenSize, fixedScreenSize);
} else {
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}
document.body.appendChild(renderer.domElement);

const colors = [0x00ffff, 0x00ff00, 0x0000ff, 0xffff00, 0xff0000, 0xff00ff];

const geometry = new THREE.BoxGeometry();
const material = colors.map(color => new THREE.MeshBasicMaterial({ color }));
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add( new THREE.AxesHelper(1) );

const sphereGeometry = new THREE.SphereGeometry(1, 8 , 8);
const sphereMaterial = new THREE.MeshBasicMaterial({ wireframe: false,
color: 0x2211dd });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//scene.add(sphere);

// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

const light = new THREE.AmbientLight(0xaaaaaa); // soft white light
scene.add(light);

// controls
let orthoControls = new OrbitControls(cameraOrtho, renderer.domElement);
let perspControls = new OrbitControls(cameraPerspective, renderer.domElement);
setupControls(orthoControls);
setupControls(perspControls);

let controls = orthoControls;
controls.listenToKeyEvents(window); // optional

window.addEventListener('resize', onWindowResize);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('mouseup', handleMouseUp, false);

function handleMouseUp(event) {
    // Your code for handling mouse release goes here
    console.log("Camera (local) matrix:");
    printMatrix(camera.matrix);
    console.log("Cube matrix:");
    printMatrix(cube.matrix);
}

function printMatrix(matrix) {
    // Print the camera matrix with values rounded to two decimals in a 4x4 grid
    for (let i = 0; i < 4; i++) {
        let row = '';
        for (let j = 0; j < 4; j++) {
            const index = j * 4 + i; // values are stored column-major internally
            row += matrix.elements[index].toFixed(2) + '\t';
        }
        console.log('Row', i, ':', row);
    }
}

const animate = function () {
    requestAnimationFrame(animate);

    if (doAnimate) {
        cube.rotation.x += 0.00;
        cube.rotation.y += 0.01;
    }

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
};

animate();

function onKeyDown(event) {
    switch (event.keyCode) {
        case 70: /*F*/
            canvasSizeIsFixed = !canvasSizeIsFixed;
            onWindowResize();
            break;

        case 79: /*O*/
            camera = cameraOrtho;
            console.log("Orthographic camera projection matrix:");
            printMatrix(camera.projectionMatrix);
            break;

        case 80: /*P*/
            camera = cameraPerspective;
            console.log("Perspective camera projection matrix:");
            printMatrix(camera.projectionMatrix);
            break;

        case 81: /*Q*/
            doAnimate = !doAnimate;
            console.log("Cube object matrix:");
            printMatrix(cube.matrix);
            break;
    }

}

function onWindowResize() {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
    if (canvasSizeIsFixed) {
        renderer.setSize(fixedScreenSize, fixedScreenSize);
    } else {
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    }

}

function setupCamera(cam) {
    cam.rotation.set(0, 0, 0);
    cam.position.x = 0;
    cam.position.y = 0;
    cam.position.z = 3;
}

function setupControls(ctrl) {
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    ctrl.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    ctrl.dampingFactor = 0.05;

    ctrl.screenSpacePanning = false;

    ctrl.minDistance = 1;
    ctrl.maxDistance = 5;

    ctrl.maxPolarAngle = Math.PI;
}
