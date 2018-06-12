import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { rootReducer } from './redux'

const middlewares = [thunk]
const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

export const configureStore = initialState => {
    const store = createStore(rootReducer, initialState, enhancer)
    return store
}
