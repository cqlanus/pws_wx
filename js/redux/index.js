// @flow
import { combineReducers } from 'redux'
import { location } from './location'
import { pws } from './pws'
import { nws } from './nws'

export const rootReducer = combineReducers({
    location,
    pws,
    nws,
})

/* ACTIONS */
export { fetchUserLocation } from './location'
export { fetchPws } from './pws'
export { fetchNws } from './nws'

/* SELECTORS */
export {
    getTemperatureData,
    getDevice,
    getWindData,
    getPressureData,
    getRainData,
} from './pws'
