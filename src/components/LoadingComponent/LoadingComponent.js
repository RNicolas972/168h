import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';
import {
    Color,
    Scene,
    WebGLRenderer,
    PerspectiveCamera
} from 'three'; 

const LoadingComponent = () => {

    const animate = ({ scene, camera }) => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    const scene = new Scene();
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
	scene.background = new Color(0xdddddd);
    
    document.body.appendChild(renderer.domElement);
    
    useEffect(() => {
        const test = async () => {
            await ModelsLoader.load( "dino.max", scene )
                .then(() => {
                    console.warn("LOADED: dino.max");
                })
                .catch(( err ) => {
                    console.error(err);
                });
        }
        ( async () => {
            await test();
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