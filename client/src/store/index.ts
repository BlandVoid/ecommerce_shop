import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'

import { history } from '../utils/history'

import createRootReducers from './reducers'

//define initial state
const initialState = {}
//define router middleware
const routerMiddleware = createRouterMiddleware(history)
//middlewares
const middlewares = [thunk, routerMiddleware]
//redux devtools with middlewares
const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares))
//get root reducer from create root reducer with history passed
const rootReducer = createRootReducers(history)
//export State type
export type RootState = ReturnType<typeof rootReducer>
//export store
export const store = createStore(rootReducer, initialState, composeEnhancer)
