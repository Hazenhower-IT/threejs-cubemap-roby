//  VR SETUP
import * as THREE from 'three';

import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
//import { VRButton } from 'three/addons/webxr/VRButton.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

let camera, scene, renderer;

let room

init();
setupVR();
animate();

function init() {

    scene = new THREE.Scene();
    
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    scene.background = cubeTextureLoader.load([
      "/skybox/cubemap1/px.png",
      "/skybox/cubemap1/nx.png",
      "/skybox/cubemap1/py.png",
      "/skybox/cubemap1/ny.png",
      "/skybox/cubemap1/pz.png",
      "/skybox/cubemap1/nz.png",
    ])


    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( 0, 1.6, 3 );


    scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );
    

    
    window.addEventListener( 'resize', onWindowResize, false );

}

function setupVR(){
    renderer.xr.enabled = true
    document.body.appendChild( VRButton.createButton( renderer ) );
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function random( min, max ){
    return Math.random() * (max-min) + min;
}

//Render (Animation Loop)

function animate() {

    renderer.setAnimationLoop( render );

}

function render() {

    renderer.render( scene, camera );

}
