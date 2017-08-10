import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'ducks'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import Immutable from 'immutable'

import bootstrapStore from './bootstrap'
import analyticsMiddleware from './analytics-middleware'

const __DEVELOPMENT__ = process.env.NODE_ENV === 'development'
const middleware = [thunk, analyticsMiddleware]
let enhancers

if (__DEVELOPMENT__) {
  middleware.push(createLogger({
    collapsed: true,
    stateTransformer (state) {
      if (Immutable.Map.isMap(state) || Immutable.List.isList(state)) {
        return state.toJS()
      }
      return state
    }
  }))

  if (window.devToolsExtension) {
    enhancers = compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || window.devToolsExtension()
    )
  } else {
    enhancers = applyMiddleware(...middleware)
  }
} else {
  enhancers = applyMiddleware(...middleware)
}

/**
 * @function
 * Create the store for redux
 * @returns {object}
 */
export default function () {
  return createStore(
    rootReducer,
    bootstrapStore(),
    enhancers
  )
}
