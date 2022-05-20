const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)


document.body.appendChild(renderer.domElement)
var light = new THREE.PointLight(0xFFFFFF, 3, 80)
light.position.set(10, 1, 8)
light.position.z += 5
scene.add(light)
let normalMap = new THREE.TextureLoader().load('OIP.jpg');
let material = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('R.jpg') })
material.normalMap = normalMap
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(4, 30, 30), material
)
let moonMater = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('R (1).jpg'), normalMap: normalMap })
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 20, 20), moonMater
)
moon.position.y = 3
scene.add(sphere)
scene.add(moon)
camera.position.z = 10

let angle = 0
let ddff = 0
let ddffq = 0

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.z += 0.005
    sphere.rotation.x += 0.005
    moon.rotation.y += 0.02
    sphere.rotation.y += 0.005
    sphere.position.y = -2
    let x = Math.cos(angle) * 5
    let z = Math.sin(angle) * 5
    angle += 0.01
    moon.position.x = x
    moon.position.z = z
    camera.rotation.y += ddff
    camera.rotation.x += ddffq
}

addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight)
})

addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            ddff = 0.01;
            break
        case 'ArrowRight':
            ddff = -0.01;
            break
        case 'ArrowUp':
            ddffq = 0.01;
            break
        case 'ArrowDown':
            ddffq = -0.01;
            break
    }
})
addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            ddff = 0;
            break
        case 'ArrowRight':
            ddff = -0;
            break
        case 'ArrowUp':
            ddffq = -0;
            break
        case 'ArrowDown':
            ddffq = -0;
            break
    }
})

animate()