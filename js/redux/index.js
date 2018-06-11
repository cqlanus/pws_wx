// @flow
import { combineReducers } from 'redux'
import { location } from './location'
import { pws } from './pws'

export const rootReducer = combineReducers({
    location,
    pws,
})

/* ACTIONS */
export { fetchUserLocation } from './location'
export { fetchPws } from './pws'
