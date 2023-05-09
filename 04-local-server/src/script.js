import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { SphereGeometry } from 'three'
import {typefaceFont} from 'three/examples/fonts/helvetiker_regular.typeface.json'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
//DEBUG
const gui = new dat.GUI()


const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

const fontLoader = new FontLoader()
// const textGeometry = new TextGeometry()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// fontLoader.load(
//     'three/examples/fonts/helvetiker_regular.typeface.json',
//     (font)=>{
//         const textGeometry = new TextGeometry(
//             'Sneha',
//             {
//                 font, size: 0.5, height:0.2,curveSegments:12,
//                 bevelEnabled:true, bevelThickness:0.03, bevelSize:0.02, bevelOffset:0,
//                 bevelSegments:5
//             }
//         )
//         const textMaterial = new THREE.MeshBasicMaterial()
//         const text = new THREE.Mesh(textGeometry,textMaterial)
//         scene.add(text)
//     }
// )


const textGeometry = new TextGeometry(
    'Sneha',
    {
        font:typefaceFont, size: 0.5, height:0.2,curveSegments:12,
        bevelEnabled:true, bevelThickness:0.03, bevelSize:0.02, bevelOffset:0,
        bevelSegments:5
    }
)
const textMaterial = new THREE.MeshBasicMaterial()
const text = new THREE.Mesh(textGeometry,textMaterial)
scene.add(text)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()