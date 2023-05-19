import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('ambientLightIntensity')

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true
directionalLight.position.set(1, 1, 0)
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.radius = 10


const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)
scene.add(directionalLight)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('directionalLightIntensity')

// const hemisphereLight = new THREE.HemisphereLight('red', 'purple', 0.3)
// scene.add(hemisphereLight)
// gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('hemisphereLightIntensity')

// const pointLight = new THREE.PointLight(0xffffff, 0.5, 3)
// pointLight.position.set(1,1,1)
// // pointLight.position.set(2,3,4)
// scene.add(pointLight)
// gui.add(pointLight, 'intensity').min(0).max(1).step(0.01).name('pointLightIntensity')


// const rectAreaLight = new THREE.RectAreaLight('blue', 2,3,1)
// scene.add(rectAreaLight)
// gui.add(rectAreaLight, 'intensity').min(0).max(5).step(0.01).name('rectAreaLightIntensity')


const spotLight = new THREE.SpotLight(0xffffff, 0.5,6,Math.PI*0.1, 0.25, 1)
spotLight.position.set(1,1,-2)
spotLight.castShadow = true
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
scene.add(spotLight)
gui.add(spotLight, 'intensity').min(0).max(5).step(0.01).name('spotLightIntensity')


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true
sphere.receiveShadow = true
sphere.position.x = - 1

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)
cube.position.x =  1
cube.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
plane.receiveShadow = true

scene.add(sphere,cube, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
