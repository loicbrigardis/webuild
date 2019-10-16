import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { TweenLite, TimelineMax, Power4 } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

import model from '../models/house.glb';
import tex from '../models/matcap-porcelain-white.jpg';
/**
 * SCENE
 */
var controller = new ScrollMagic.Controller();
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
var container = document.querySelector('#scene');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


var loader = new GLTFLoader();

var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
container.appendChild(renderer.domElement);

camera.position.z = 8.5;



/**
 * LIGHTS
 */

var directionalLight = new THREE.DirectionalLight(0xfffade, 0.6);
directionalLight.position.set(1, 0.5, 5);
directionalLight.castShadow = true;
directionalLight.shadowMapWidth = 4096;
directionalLight.shadowMapHeight = 4096;
scene.add(directionalLight);


var lightp = new THREE.AmbientLight(0xffffff, 0.4); // soft white light
scene.add(lightp);

var light = new THREE.PointLight(0xfcffe0, 1, 0);
light.position.set(0, 0, 0, 2);
light.castShadow = true;
scene.add(light);

/**
 * GEOMETRY
 */

// manager
function render() {
    renderer.render(scene, camera);
}

var manager = new THREE.LoadingManager(render);
// matcap
var loader = new THREE.TextureLoader(manager);

var matcap = loader.load(tex, function () {
    matcap.encoding = THREE.sRGBEncoding;
});

var porcelaine = new THREE.MeshMatcapMaterial(
    { color: 0xffffff, matcap: matcap }
);

var grilles = new THREE.MeshStandardMaterial(
    { color: 0x694c36 }
);

var murs = new THREE.MeshStandardMaterial(
    { color: 0xa8a8a8 }
);

var terasse = new THREE.MeshStandardMaterial(
    { color: 0xe0e0e0 }
);

var portes = new THREE.MeshStandardMaterial(
    { color: 0xe8e2c3 }
);

var sol = new THREE.MeshStandardMaterial(
    { color: 0xf5f5f5 }
);

var glass = new THREE.MeshStandardMaterial(
    {
        color: 0xf2f3f5,
        transparent: true,
        opacity: 0.8
    }
);

new GLTFLoader(manager).load(
    // resource URL
    model,
    // called when the resource is loaded
    function (gltf) {

        gltf.scene.rotation.y = THREE.Math.degToRad(-45);

        gltf.scene.receiveShadow = true;
        gltf.scene.castShadow = true;
        // var material = 
        gltf.scene.children.forEach(obj => {
            obj.receiveShadow = true;
            obj.castShadow = true;
            obj.material = porcelaine;
        });
        gltf.scene.children[0].material = grilles;
        gltf.scene.children[1].material = murs;
        gltf.scene.children[3].material = sol;
        gltf.scene.children[5].material = glass;
        gltf.scene.children[8].material = terasse;
        gltf.scene.children[9].material = portes;

        gltf.scene.position.y = -0.8;
        gltf.scene.position.z = 3;
        scene.add(gltf.scene);

        // TweenLite.fromTo(gltf.scene.rotation, 2,
        //     { y: THREE.Math.degToRad(0) },
        //     { y: THREE.Math.degToRad(-45) });

        // TweenLite.fromTo(gltf.scene.position, 1, { x: 2 }, { x: 1 });

        const tlLights = new TimelineMax();
        tlLights
            .fromTo(lightp, 2, { intensity: 0.8 }, { intensity: 0.4 })
            .fromTo(directionalLight, 2, { intensity: 0.6 }, { intensity: 0.4 })


        // new ScrollMagic.Scene({
        //     duration: document.body.clientHeight,
        //     offset: 0
        // })
        //     .setPin("#scene")
        //     .addTo(controller);


        const tlScene2 = new TimelineMax();
        tlScene2
            .to(gltf.scene.position, 2, { z: 0.4 }, 0)
            .to(gltf.scene.rotation, 2, { x: THREE.Math.degToRad(15) }, 0)
            .add("after", "+=2")
            .to(gltf.scene.rotation, 2, { y: "-=" + THREE.Math.degToRad(10) }, 0)
            .to(gltf.scene.position, 2, { z: 1.2 }, 0)
            .add(tlLights)

        // new ScrollMagic.Scene({
        //     duration: '2000',
        //     offset: 0
        // })
        //     .setTween(tlScene2)
        //     .addTo(controller);


        const master = new TimelineMax();
        master
            .fromTo(gltf.scene.rotation, 2,
                { y: THREE.Math.degToRad(-45) },
                { y: -THREE.Math.degToRad(65) }, 0)
            .to(gltf.scene.position, 2, { z: '2' }, 0)
            .add(tlScene2)

        new ScrollMagic.Scene({
            duration: document.body.clientHeight,
            // triggerElement: '.c-articles',
            offset: 0,
        })
            .setTween(
                master
            )
            .addTo(controller);

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');

    }
);

/**
 * ANIMATE Fn
 */

var animate = function () {
    requestAnimationFrame(animate);

    //Camera rotation
    camera.position.x += (mouseX * 0.001 - camera.position.x) * .05;
    camera.position.y += (- mouseY * 0.001 - camera.position.y) * .05;
    camera.lookAt(scene.position);


    renderer.render(scene, camera);
};

animate();

/**
 * MOUSE
 */

//Mouse effect rotation
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}
document.addEventListener('mousemove', onDocumentMouseMove, false);

/**
 * RESIZE
 */

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}