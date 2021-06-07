import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export class ModelsLoader {
    static async load( filePath, scene, defaultPath='/assets/3d_models/') {
        return new Promise(( res, rej ) => {
            const loader = new MTLLoader();

            loader.setPath(defaultPath);
            loader.load(filePath, function (gltf) {
                scene.add( gltf.scene );
                res();
            }, undefined, function (error) {
                console.error(error);
                rej();
            });
        });
    }
}