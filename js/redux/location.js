import { Promise } from 'core-js'

// @flow

/* ACTION TYPES */
export const Types = {
    LOCATION_FETCH: 'LOCATION_FETCH',
    LOCATION_FETCH_STARTED: 'LOCATION_FETCH_STARTED',
    LOCATION_FETCH_COMPLETE: 'LOCATION_FETCH_COMPLETE',
    LOCATION_FETCH_FAILED: 'LOCATION_FETCH_FAILED',
}

/* ACTION CREATORS */
const fetchUserLocationFailed = error => {
    return {
        type: Types.LOCATION_FETCH_FAILED,
        error,
    }
}

const fetchUserLocationComplete = coords => {
    return {
        type: Types.LOCATION_FETCH_COMPLETE,
        coords,
    }
}

const fetchUserLocationStarted = () => {
    return {
        type: Types.LOCATION_FETCH_STARTED,
    }
}

/* THUNKS */
export const fetchUserLocation = () => async (dispatch: any) => {
    dispatch(fetchUserLocationStarted())
    try {
        const { coords } = await userLocation()
        dispatch(fetchUserLocationComplete(coords))
    } catch (error) {
        fetchUserLocationFailed(error)
    }
}

const userLocation = () => {
    return new Promise((resolve, reject) => {
        const success = data => resolve(data)
        const error = error => reject(error)
        navigator.geolocation.getCurrentPosition(success, error)
    })
}

type State = {
    isFetching: boolean,
    coords: mixed,
    message: ?string,
}

type Action =
    | { type: string }
    | { type: string, coords: mixed }
    | { type: string, error: mixed }

const initialState = {
    isFetching: false,
    coords: null,
    message: null,
}

export const location = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case Types.LOCATION_FETCH_STARTED: {
            return {
                ...state,
                isFetching: true,
                coords: null,
                message: null,
            }
        }
        case Types.LOCATION_FETCH_COMPLETE: {
            return {
                ...state,
                isFetching: false,
                coords: action.coords && action.coords,
                message: null,
            }
        }
        case Types.LOCATION_FETCH_FAILED: {
            return {
                ...state,
                isFetching: false,
                coords: null,
                message: action.error && action.error,
            }
        }
        default:
            return state
    }
}
