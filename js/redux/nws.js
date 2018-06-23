// @flow
import type { Point } from '../types'
import { api } from '../api/ApiManager'

/* ACTION TYPES */
const Types = {
    NWS_FETCH_STARTED: 'NWS_FETCH_STARTED',
    NWS_FETCH_COMPLETED: 'NWS_FETCH_COMPLETED',
    NWS_FETCH_FAILED: 'NWS_FETCH_FAILED',
}

/* ACTION CREATORS */
const fetchNwsStarted = () => ({
    type: Types.NWS_FETCH_STARTED,
})

const fetchNwsCompleted = nws => ({
    type: Types.NWS_FETCH_COMPLETED,
    nws,
})

const fetchNwsFailed = error => ({
    type: Types.NWS_FETCH_FAILED,
    error,
})

/* THUNKS */
export const fetchNws = (point: Point) => async (dispatch: any) => {
    try {
        dispatch(fetchNwsStarted())
        const data = await api.nws.getDetailedForecast(point)
        dispatch(fetchNwsCompleted(data))
    } catch (error) {
        dispatch(fetchNwsFailed(error))
    }
}

type State = {
    isWorking: boolean,
    forecast: mixed,
    error: mixed,
}

type Action =
    | { type: string }
    | { type: string, nws: mixed }
    | { type: string, error: mixed }

const initialState = {
    isWorking: false,
    forecast: null,
    error: null,
}

/* REDUCER */
export const nws = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case Types.NWS_FETCH_STARTED:
            return {
                ...state,
                isWorking: true,
            }
        case Types.NWS_FETCH_COMPLETED:
            return {
                ...state,
                isWorking: false,
                forecast: action.nws && action.nws,
            }
        case Types.NWS_FETCH_FAILED:
            return {
                ...state,
                error: action.error && action.error,
                isWorking: false,
            }
        default:
            return state
    }
}
