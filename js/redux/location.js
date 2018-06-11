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

const fetchUserLocationComplete = result => {
    return {
        type: Types.LOCATION_FETCH_COMPLETE,
        result,
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
        const response = await fetch('https://ipinfo.io', {
            method: 'GET',
            headers: { accept: 'application/json' },
        })

        const json = await response.json()
        dispatch(fetchUserLocationComplete(json))
    } catch (error) {
        dispatch(
            fetchUserLocationFailed(
                'An error occurred calling the location API',
            ),
        )
    }
}

type State = {
    isFetching: boolean,
    result: mixed,
    message: ?string,
}

type Action =
    | { type: string }
    | { type: string, result: mixed }
    | { type: string, error: mixed }

const initialState = {
    isFetching: false,
    result: null,
    message: null,
}

export const location = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case Types.LOCATION_FETCH_STARTED: {
            return {
                ...state,
                isFetching: true,
                result: null,
                message: null,
            }
        }
        case Types.LOCATION_FETCH_COMPLETE: {
            return {
                ...state,
                isFetching: false,
                result: action.result && action.result,
                message: null,
            }
        }
        case Types.LOCATION_FETCH_FAILED: {
            return {
                ...state,
                isFetching: false,
                result: null,
                message: action.error && action.error,
            }
        }
        default:
            return state
    }
}
