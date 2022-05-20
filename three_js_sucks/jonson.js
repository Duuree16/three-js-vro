const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)


document.body.appendChild(renderer.domElement)
var light = new THREE.PointLight(0xffffff, 3, 80)
light.position.set(0, 20, 30)
var light2 = new THREE.PointLight(0xffffff, 3, 80)
light2.position.set(0, 20, -30)
camera.position.z = 8
camera.position.x = 2
camera.position.y = 4
    // camera.rotation.y += 0.2
scene.add(light)
scene.add(light2)
scene.background = new THREE.Color(0xffffff);
var velocityY = 0
var velocityZ = 0
var velocityX = 0
var rotationX = 0
var rotationZ = 0
var rotationY = 0
var gravity = -0.025

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(60, 45);
let map = new THREE.TextureLoader().load('./images.png');
const material2 = new THREE.MeshBasicMaterial({ map: map, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry2, material2);
scene.add(plane);

plane.rotation.x = Math.PI / 2
plane.position.set(0, -2.6, 0)
var onground = false
let angle = 0
let angleVel = 0
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
}
const camVelocity = {
    z: 0,
    x: 0,
}

function animate() {
    cube.position.y += velocityY;
    cube.position.z += velocityZ;
    cube.position.x += velocityX;
    angle += angleVel
    cube.rotation.y = angle;
    cube.rotation.z += rotationZ;
    cube.rotation.x += rotationX;
    camera.rotation.y = angle
    camera.position.x = cube.position.x
    camera.position.z = cube.position.z
    camera.position.y = cube.position.y
    camera.position.y += 2

    requestAnimationFrame(animate)
    determineVelocity()
    renderer.render(scene, camera)
    if (cube.position.y - 1 + velocityY >= plane.position.y) {
        velocityY += gravity
        onground = false
    } else {
        velocityY = -velocityY * 0.4
        if (velocityY < 0.01) {
            velocityY = 0
            onground = true
        }
    }
}

animate()

function determineVelocity() {
    if (keys.w) {
        velocityZ = -Math.cos(angle) / 5;
        velocityX = -Math.sin(angle) / 5;
    }
    if (keys.s) {
        velocityZ = Math.cos(angle) / 5;
        velocityX = Math.sin(angle) / 5;
    }
    if (keys.a) {
        angleVel = 0.03
    }
    if (keys.d) {
        angleVel = -0.03
    }
}

addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            if (onground)
                velocityY += 0.5
            break
        case 'ArrowUp':
            keys.w = true
            break
        case 'ArrowLeft':
            keys.a = true
            break
        case 'ArrowRight':
            keys.d = true
            break
        case 'ArrowDown':
            keys.s = true
            break
    }
})
addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            velocityZ = -0
            velocityX = -0
            keys.w = false
            break
        case 'ArrowRight':
            velocityX = 0
            keys.d = false
            angleVel = 0
            rotationY = -0
            break
        case 'ArrowLeft':
            rotationY = -0
            keys.a = false
            angleVel = 0
            break
        case 'ArrowDown':
            velocityZ = 0
            keys.s = false
            velocityX = -0
            velocityZ = -0
            break
    }
})