// Import the core Three.js library
import * as THREE from 'three';

// Import OrbitControls to allow moving the camera with the mouse
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Core Setup
// Select the <canvas> element from the HTML file where the 3D scene will be drawn
const canvas = document.querySelector('#three-canvas');

// Create a new empty Scene - this is the container for all our 3D objects
const scene = new THREE.Scene();

// Set the background color of the scene to 'lightblue'
scene.background = new THREE.Color("lightblue");


// Create a PerspectiveCamera (simulates how the human eye sees)
const camera = new THREE.PerspectiveCamera(
    75,                                     // Field of View: how wide the camera sees (in degrees)
    window.innerWidth / window.innerHeight, // Aspect Ratio: width divided by height
    0.1,                                    // Near plane: objects closer than this won't be seen
    1000                                    // Far plane: objects further than this won't be seen
);

camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0)


// // --- ORTHOGRAPHIC CAMERA SETUP ---
// // An OrthographicCamera means objects stay the same size regardless of distance (no perspective)
// // This is often used for 2D games, UI, or technical diagrams (Isometric view)
// const aspect = window.innerWidth / window.innerHeight;
// const viewSize = 3; // How many units of the 3D world we want to see vertically

// const camera = new THREE.OrthographicCamera(
//     -viewSize * aspect,  // Left: Distance from center to the left edge
//      viewSize * aspect,  // Right: Distance from center to the right edge
//      viewSize,           // Top: Distance from center to the top edge
//     -viewSize,          // Bottom: Distance from center to the bottom edge
//      0.1,               // Near plane
//      1000               // Far plane
// );

// // Position the camera so it's looking at the center
// camera.position.set(2, 2, 2); // Move it slightly to the side/top for a 3D effect
// camera.lookAt(0, 0, 0);       // Point the camera at the center of the scene

// Create the WebGLRenderer which actually draws the 3D pixels onto the canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,         // Tell it which canvas to use
    antialias: true,        // Makes the edges of objects look smoother
    // alpha: true,         // Allows for a transparent background
    // powerPreference: "high-performance", // Hints the browser to use the strongest GPU
    // preserveDrawingBuffer: true, // Required if you want to take screenshots of the canvas
    // precision: "highp",  // Shader precision: "highp", "mediump", or "lowp"
    // logarithmicDepthBuffer: true, // Helps with z-fighting in massive scenes
});

// Set the size of the renderer to fill the entire browser window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set pixel ratio for high-resolution screens (like Retina displays) to avoid blurriness
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Objects
// Create a Geometry (The Shape)
// BoxGeometry(width, height, depth)
const geometry = new THREE.BoxGeometry(1, 1, 1);

/* --- Alternative Geometries ---
// SphereGeometry(radius, widthSegments, heightSegments)
// const geometry = new THREE.SphereGeometry(0.7, 32, 32); 

// CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
// const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32); 

// PlaneGeometry(width, height)
// const geometry = new THREE.PlaneGeometry(2, 2); 

// TorusGeometry(radius, tubeThickness, radialSegments, tubularSegments)
// const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100); 
*/

// Create a Material (The Surface)
const material = new THREE.MeshStandardMaterial({
    color: 0x4f46e5,        // The base color
    roughness: 0.1,         // Smoothness (0-1)
    metalness: 0.8,         // Metallic look (0-1)
    // wireframe: true,     // See the triangles
    // transparent: true,   // Required for opacity to work
    // opacity: 0.5,        // Transparency level (0-1)
    // emissive: 0x00ffff,  // Glow color
    // emissiveIntensity: 1, // Strength of the glow
    // flatShading: true,   // Low-poly / faceted look
    // side: THREE.DoubleSide // Render both inside and outside
});

/* --- Alternative Materials ---
// MeshBasicMaterial: No lights needed, very simple
// const material = new THREE.MeshBasicMaterial({ color: 0x4f46e5 }); 

// MeshLambertMaterial: Matte look, good for performance
// const material = new THREE.MeshLambertMaterial({ color: 0x4f46e5 }); 

// MeshPhongMaterial: Shiny look with specular highlights
// const material = new THREE.MeshPhongMaterial({ 
//     color: 0x4f46e5, 
//     shininess: 100,      // How shiny the highlight is
//     specular: 0x111111   // The color of the reflection
// }); 

// MeshToonMaterial: Cartoon / Cel-shaded look
// const material = new THREE.MeshToonMaterial({ color: 0x4f46e5 }); 

// MeshNormalMaterial: Rainbow colors based on surface direction (good for debugging)
// const material = new THREE.MeshNormalMaterial(); 
*/

// Create a Mesh - this combines the geometry (shape) and material (look) into a 3D object
const cube = new THREE.Mesh(geometry, material);
// cube.position.x = 1
// Add the cube to our scene so it becomes visible
scene.add(cube);

// 3. Lights
// AmbientLight(color, intensity) - provides soft, even light to everything. No shadows.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

// PointLight(color, intensity, distance, decay) - sits at a point and shines in all directions.
const pointLight = new THREE.PointLight(0xffffff, 20);      
pointLight.position.set(2, 3, 4);                          // Position the light (x, y, z)
scene.add(pointLight);

/* --- Alternative Lights ---
// DirectionalLight(color, intensity) - shines in one direction, like the Sun. 
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// SpotLight(color, intensity, distance, angle, penumbra, decay) - shines in a cone, like a flashlight.
// const spotLight = new THREE.SpotLight(0xffffff, 50);
// spotLight.position.set(0, 5, 0);
// spotLight.angle = Math.PI / 6; // The width of the cone
// spotLight.penumbra = 0.5;      // How soft the edges are (0-1)
// scene.add(spotLight);

// HemisphereLight(skyColor, groundColor, intensity) - light from the sky and light from the ground.
// const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x444444, 1);
// scene.add(hemiLight);
*/

// 4. Controls
// Initialize OrbitControls so you can rotate the scene with your mouse
const controls = new OrbitControls(camera, canvas);

// Enable damping for smoother movement (it adds a bit of "weight" to the camera)
controls.enableDamping = true;
controls.dampingFactor = 0.1; // How fast it stops moving (0-1)

// --- Alternative Control Properties ---
// controls.autoRotate = true;       // Spins the camera around automatically
// controls.autoRotateSpeed = 10;   // Speed of auto-rotation

// controls.enableZoom = false;      // Disable zooming
// controls.minDistance = 2;         // Minimum zoom distance
// controls.maxDistance = 10;        // Maximum zoom distance

// controls.minPolarAngle = Math.PI / 4; // Limit vertical rotation (top)
// controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation (bottom)

// controls.target.set(0, 1, 0);     // Change what the camera looks at

// 5. Animation Loop
// This function runs every single frame (usually 60 times per second)
function animate() {
    // Request the browser to call the animate function again for the next frame
    requestAnimationFrame(animate);

    // Rotate the cube slightly on the X and Y axes
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // Required for the damping effect of OrbitControls to work
    controls.update();

    // Finally, render the scene from the perspective of our camera
    renderer.render(scene, camera);
}

// 6. Handle Window Resize
// Update the scene if the user changes the size of the browser window
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;

    // // Update the Orthographic camera bounds
    // camera.left = -viewSize * aspect;
    // camera.right = viewSize * aspect;
    // camera.top = viewSize;
    // camera.bottom = -viewSize;


    camera.aspect = window.innerWidth / window.innerHeight;
    // Tell the camera to recalculate its projection matrix
    camera.updateProjectionMatrix();

    // Resize the renderer and the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop for the first time
animate();
