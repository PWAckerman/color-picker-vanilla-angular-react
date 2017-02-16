import {createStore, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

const middleware = [reduxImmutableStateInvariant()];

export default function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}
