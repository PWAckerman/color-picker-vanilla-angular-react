import * as types from './actionTypes.js';

export function saveImage(image){
    return {
        type: types.SAVE_IMAGE_STATE,
        image
    }
}

export function loadPrevious(){
    return {
        type: types.RESTORE_IMAGE_STATE
    }
}
