import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export class ModelsLoader {
    static async load( filePath, scene, defaultPath='/assets/3d_models/') {
        return new Promise( async ( res, rej ) => {
            const loader = new MTLLoader();
            loader.setPath(defaultPath);
            loader.loadAsync(filePath)
            .then(( file ) => {
                res( file )
            })
            .catch(( err ) => {
                console.error( err );
            });
        });
    }
}