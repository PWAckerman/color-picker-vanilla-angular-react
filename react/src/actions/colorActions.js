import * as types from './actionTypes.js';

export function updateHue(hue){
    return {type: types.UPDATE_HUE, hue }
}

export function updateSaturation(saturation){
    return {type: types.UPDATE_SATURATION, saturation }
}

export function updateLuminance(luminance){
    return {type: types.UPDATE_LUMINANCE, luminance }
}
