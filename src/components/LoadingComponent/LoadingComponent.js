import React, { useEffect } from 'react';
import { ModelsLoader } from '../models/modelsLoader';

const LoadingComponent = () => {
    
    useEffect(() => {
        const test = async () => {
            return new Promise(( res, rej ) => {
                ModelsLoader.load("../../../public/assets/3d_models/dinosaur02.max");
            });
        }
        ( async () => {
            await test();
        })()
    });

    return(
        <>
            <span> Test </span>
        </>
    );
}

export {
    LoadingComponent
}