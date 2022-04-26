import React from 'react';
import preloader from './Preloader/Preloader2.svg'


type PreloaderType = {}

export const Preloader = (props:PreloaderType) => {
    return (
        <div>
            <img src={preloader}/>
        </div>
    );
};

