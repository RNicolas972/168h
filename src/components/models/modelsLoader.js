import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelsLoader {
    static async load( filePath, defaultPath='/assets/3d_models/') {
        return new Promise( async ( res, rej ) => {
            let loader = null;
            
            const regex2 = new RegExp('/*.(?:max|gltf|glb)');
            const isMatch = filePath.match( regex2 )[0];
            
            switch( isMatch ) {
                case '.max':
                    loader = new MTLLoader();
                    break;

                case '.gltf':
                case '.glb':
                    loader = new GLTFLoader();
                    break;
                default:
                    console.error(`ERROR when trying to load ${filePath} with format: ${isMatch}`);
            }

            loader.setPath(defaultPath);
            loader.loadAsync(filePath)
            .then(( file ) => {
                res( file.scene.children[0] )
            })
            .catch(( err ) => {
                console.error( err );
            });
        });
    }
}