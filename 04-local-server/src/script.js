import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// mesh.position.x = 0.6
// mesh.position.y = -0.3
// mesh.position.z = 1
mesh.position.set(0.7,0.6,1)

//Axes helper
const axesHelper = new THREE.AxesHelper(2)

//Scale
mesh.scale.set(0.4,0.5,1)

//Rotation
mesh.rotation.reorder('ZYX')
mesh.rotation.y = 2
mesh.rotateZ(2)

scene.add(axesHelper)
scene.add(mesh)


// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1
scene.add(camera)

// camera.lookAt(new THREE.Vector3(2,0,0))
camera.lookAt(mesh.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)