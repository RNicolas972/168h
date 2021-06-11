import {
    Scene,
    Color,
    AmbientLight,
    WebGLRenderer,
    PerspectiveCamera,
} from 'three';
import './LoadingComponent.css';
import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';
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
        // CAMERA SETUP
        const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.x = 3;
        camera.position.z = 5;
        camera.lookAt(0,0,0);
        sceneObj.push( camera );

        // LIGTH SETUP
        const light = new AmbientLight( 0xFFFFF, 20 );
        sceneObj.push( light );
        
        // SCENE SETUP
        const scene = new Scene();
        scene.background = new Color("rgb(38, 118, 255)");
        
        const animate = () => {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        
        const totoro = await ModelsLoader.load("totoro.glb");

        totoro.position.set( 0.1, -2.5, 0.1 );
        totoro.scale.set( 0.25, 0.25, 0.25 );
        
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

    const textCanvas = `const canvas = document.getElementById('totoro-renderer'); // Réccupération de la balise possédant l'id: 'totoro-renderer'.\nconst containerWidth = document.querySelector('div.main-container').offsetWidth; // On réccupère sa width.\nconst renderer = new WebGLRenderer({ canvas }); // On créer un fênetre de rendu pour notre scène.\n\nrenderer.setSize( containerWidth, containerWidth / 2 ); // On redimensionne la fênetre à la taille du container.\ndocument.querySelector('div.main-container').appendChild( renderer.domElement ); // On ajouter notre fênetre de rendu dans le DOM`;
    const textRender = `const sceneObj = []; // Nous créons un tableau dans lequel nous allons mettre tous les éléments que la scéne affichera`;
    const textCamera = `const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  // Création de la caméra\ncamera.position.x = 3; // On la positionne sur l'axe des X\ncamera.position.z = 5; // On la positionne sur l'axe des Z\ncamera.lookAt(0, 0, 0); // On indique à la camera, à quelle position elle doit regarder.\nsceneObj.push(camera); // On ajoute la camera dans notre tableau`;
    const textLight = `const light = new AmbientLight( 0xFFFFF, 20 ); // Création de notre lumière 'blanche'\nsceneObj.push( light ); // Ajout de la lumière à notre tableau`;
    const textScene = `const scene = new Scene(); // Création de notre Scène\nscene.background = new Color("rgb(38, 118, 255)"); // On définit la couleur de fond de notre scène`;
    const textAnimate = `const animate = () => {\n\trequestAnimationFrame( animate ); // Permet de lier la fonction animate au moteur de rendu Three.JS \n\trenderer.render( scene, camera ); // Permet d'appeler le rendu à chaque 'frame' \n}`;
    const textAddObj = `// On ajoute nos objet itérativement à notre scène. \nsceneObj.forEach(( elt ) => { \n\tscene.add( elt );\n});\nanimate(); // On appelle notre fonction animate pour lancer le rendu.`;

    return(
        <div className="main-container">
            <h3>Importer des objets</h3>
            <p>Dans cette première partie nous allons apprendre à importer un objet dans une scène créer avec Three.JS</p>
            <h4>Créer la fênetre de rendu</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textCanvas }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                    />
            </div>
            <h4>Créer la fênetre de rendu</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textRender }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                />
            </div>
            <h4>Création de la camera</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textCamera }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                />
            </div>
            <h4>Création de la lumière</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textLight }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                />
            </div>
            <h4>Création de la Scène</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textScene }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                />
            </div>
            <h4>Création de la function animate</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textAnimate }
                    language={'javascript'}
                    showLineNumbers={ true }
                    theme={ dracula }
                    codeBlock
                />
            </div>
            <h4>Ajout des models à notre scène</h4>
            <div className="block-code">
                <CopyBlock
                    text={ textAddObj }
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