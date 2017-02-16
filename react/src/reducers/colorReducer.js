import * as types from '../actions/actionTypes';

export default function colorReducer(state={hue:180,saturation:50,luminance:50}, action){
    switch(action.type){
        case types.UPDATE_HUE:
            console.log('update_hue');
            return Object.assign({}, state, {hue: action.hue})
            break;
        case types.UPDATE_SATURATION:
            return Object.assign({}, state, {saturation: action.saturation})
            break;
        case types.UPDATE_LUMINANCE:
            return Object.assign({}, state, {luminance: action.luminance})
            break;
        default:
            return state;
    }
}
