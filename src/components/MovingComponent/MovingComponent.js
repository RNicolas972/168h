import './MovingComponent.css';
import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
    Scene,
    Color,
    AmbientLight,
    AxesHelper,
    WebGLRenderer,
    PerspectiveCamera
} from 'three';

const MovingComponent = () => {
    
    const initScene = async () => {

        const canvas = document.getElementById('totoro-renderer');
        const containerWidth = document.querySelector('div.main-container').offsetWidth;
        const renderer = new WebGLRenderer({ canvas });

        renderer.setSize( containerWidth, containerWidth / 2 );
        document.querySelector('div.main-container').appendChild( renderer.domElement );

        const sceneObj = [];
        const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const light = new AmbientLight(0xFFFFF, 1);
        sceneObj.push( light );
        // SCENE SETUP
        const scene = new Scene();
        scene.background = new Color("rgb(38, 118, 255)");
        
        // CAMERA SETUP
        camera.position.x = 3;
        camera.position.z = 5;
        camera.lookAt(0,0,0);

        sceneObj.push( camera );
        // AXESHELPER SETUP
        const axesHelper = new AxesHelper( 500 );
        sceneObj.push( axesHelper );

        const animate = () => {
            setupKeyControls()
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        
        // ORBITCONTROLS SETUP
        const orbit = new OrbitControls(camera, renderer.domElement);
        sceneObj.push( orbit );
        
        const totoro = await ModelsLoader.load("totoro.glb");
        totoro.position.set( 0, 0.85, 0 );
        totoro.scale.x = 0.5;
        totoro.scale.y = 0.5;
        totoro.scale.z = 0.5;
        
        sceneObj.push( totoro );

        sceneObj.forEach(( elt ) => {
            scene.add( elt );
        });
        
        function setupKeyControls(event) {
            // var cube = sceneObj[0].getObjectByName('totoro');
            document.onkeydown = function(e) {
              switch (e.keyCode) {
                default:
                break;
                case 37:
                totoro.rotation.y = 1.5;
                totoro.position.x += 0.1;
                break;
                case 38:
                totoro.rotation.y = -3;
                totoro.position.z -= 0.1;
                break;
                case 39:
                totoro.rotation.y = -1.5;
                totoro.position.x -= 0.1;
                break;
                case 40:
                totoro.rotation.y = 0;
                totoro.position.z += 0.1;
                break;
              }
            };
          } 

        animate();
    }


    useEffect(() => {
        ( async () => {
            await initScene();
        })()
    });

    return(
        <div className="main-container">
            <canvas id="totoro-renderer"></canvas>
        </div>
    );
}

export {
    MovingComponent
}