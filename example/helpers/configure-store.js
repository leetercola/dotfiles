import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';

let enhancers;

if(window.devToolsExtension) {
    enhancers = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || window.devToolsExtension());
} else {
    enhancers = applyMiddleware(thunk);
}


export default function () {
    return createStore(
        rootReducer,
        {},
        enhancers
    );
}