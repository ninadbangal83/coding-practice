import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * CONCEPT 4: 3D MATH (VECTORS & DISTANCE)
 * Goal: Distance calculation and direction tracking.
 */

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 'red' }));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 'blue' }));
scene.add(cube1, cube2);

// UI to show math
const info = document.createElement('div');
info.style.cssText = 'position:fixed; top:20px; left:20px; color:white; font-family:sans-serif; background:rgba(0,0,0,0.5); padding:10px;';
document.body.appendChild(info);

scene.add(new THREE.AmbientLight(0xffffff, 1));
const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);
    
    // Move cube1 in a circle
    const time = Date.now() * 0.002;
    cube1.position.x = Math.cos(time) * 3;
    cube1.position.z = Math.sin(time) * 3;

    // MATH: Calculate distance
    const distance = cube1.position.distanceTo(cube2.position);
    
    // MATH: Calculate direction vector from cube2 to cube1
    const direction = new THREE.Vector3().subVectors(cube1.position, cube2.position).normalize();

    info.innerHTML = `
        Distance: ${distance.toFixed(2)}<br>
        Direction X: ${direction.x.toFixed(2)}<br>
        Direction Z: ${direction.z.toFixed(2)}
    `;

    controls.update();
    renderer.render(scene, camera);
}
animate();
