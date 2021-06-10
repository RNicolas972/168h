import {
    Scene,
    Color,
    AmbientLight,
    AxesHelper,
    WebGLRenderer,
    PerspectiveCamera,
} from 'three';
import './LoadingComponent.css';
import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CopyBlock, dracula } from "react-code-blocks";

const LoadingComponent = () => {
    
    const initScene = async () => {

        const canvas = document.getElementById('totoro-renderer');
        const containerWidth = document.querySelector('div.main-container').offsetWidth;
        const renderer = new WebGLRenderer({ canvas });

        renderer.setSize( containerWidth, containerWidth / 2 );
        renderer.setPixelRatio(window.devicePixelRatio);
        document.querySelector('div.main-container').appendChild( renderer.domElement );

        const sceneObj = [];
        const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const light = new AmbientLight( 0xFFFFF, 20 );
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
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        
        // ORBITCONTROLS SETUP
        const orbit = new OrbitControls(camera, renderer.domElement);
        sceneObj.push( orbit );
        
        const totoro = await ModelsLoader.load("totoro.glb");

        totoro.position.set( 0.1, 0.1, 0.1 );
        totoro.scale.set( 0.5, 0.5, 0.5 );
        
        sceneObj.push( totoro );

        sceneObj.forEach(( elt ) => {
            scene.add( elt );
        });

        animate();
    }

    useEffect(() => {
        ( async () => {
            await initScene();
        })()
    });

    const text1 = `const canvas = document.getElementById('totoro-renderer'); // Réccupération de la balise possédant l'id: 'totoro-renderer'.\nconst containerWidth = document.querySelector('div.main-container').offsetWidth; // On réccupère sa width.\nconst renderer = new WebGLRenderer({ canvas }); // On créer un fênetre de rendu pour notre scène.\n\nrenderer.setSize( containerWidth, containerWidth / 2 ); // On redimensionne la fênetre à la taille du container.\ndocument.querySelector('div.main-container').appendChild( renderer.domElement ); // On ajouter notre fênetre de rendu dans le DOM`;

    return(
        <div className="main-container">
            <h3>Importer des objets</h3>
            <p>Dans cette première partie nous allons apprendre à importer un objet dans une scène créer avec Three.JS</p>
            <h4>1. Créer la fênetre de rendu</h4>
            <div className="block-code">
                <CopyBlock
                    text={ text1 }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                    />
            </div>
            <h4>2. Créer la fênetre de rendu</h4>
            <div className="block-code">
                <CopyBlock
                    text={ `const sceneObj = []; // Nous créons un tableau dans lequel nous allons mettre tous les éléments que la scéne affichera` }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                />
            </div>
            <canvas id="totoro-renderer"></canvas>
        </div>
    );
}

export {
    LoadingComponent
}