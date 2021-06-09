import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
    Mesh,
    Scene,
    Color,
    PointLight,
    AxesHelper,
    BoxGeometry,
    WebGLRenderer,
    MeshBasicMaterial,
    PerspectiveCamera
} from 'three';

const LoadingComponent = () => {
    
    const initScene = () => {
        const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const light = new PointLight(0xff0000, 10, 500);
        // SCENE SETUP
        const scene = new Scene();
        scene.background = new Color("rgb(0,0,0)");
        // CAMERA SETUP
        camera.position.x = 3;
        camera.position.z = 5;
        camera.lookAt(0,0,0);
        // AXESHELPER SETUP
        const axesHelper = new AxesHelper( 500 );
        // CUBE SETUP
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh( geometry, material );
        cube.position.set( 0, 0, 0 );
        
        const animate = () => {
            requestAnimationFrame( animate );
            renderer.render( scene, camera )
        }
        
        const renderer = new WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        // ORBITCONTROLS SETUP
        const orbit = new OrbitControls(camera, renderer.domElement);
        
        [ camera, light, cube, axesHelper, orbit ].forEach(( elt ) => {
            scene.add( elt );
        });

        animate();
    }

    useEffect(() => {
        // const test = async () => {
        //     return new Promise(( res, rej ) => {
        //         ModelsLoader.load("../../../public/assets/3d_models/dinosaur02.max")
        //         .then(() => {
        //             res();
        //         })
        //         .catch(() => {
        //             rej();
        //         });
        //     });
        // }
        ( async () => {
            // await test();
            initScene();
        })()
    });

    return(
        <>
        </>
    );
}

export {
    LoadingComponent
}