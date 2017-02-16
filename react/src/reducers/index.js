import {combineReducers} from 'redux';
import color from './colorReducer.js';
import imageHistory from './imageReducer.js';

const rootReducer = combineReducers({
    color,
    imageHistory
});

export default rootReducer;
