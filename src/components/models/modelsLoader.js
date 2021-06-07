// import * as THREE from 'three';
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';

export class ModelsLoader {
    static async load(filePath) {
        console.log("ModelsLoader");
        return new Promise(( res, rej ) => {
            
            const scene = new Scene();
            const renderer = new WebGLRenderer();
            const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

            // loader.load( filePath, function (gltf) {

            //     scene.add(gltf.scene);
            //     res();

            // }, undefined, function (error) {

            //     console.error(error);
            //     rej();

            // });
            const animate = function () {
				requestAnimationFrame( animate );

				renderer.render( scene, camera );
			};
            animate();
        });
    }
}