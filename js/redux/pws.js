// @flow
import { api } from '../api/ApiManager'

/* ACTION TYPES */
const Types = {
    PWS_FETCH_STARTED: 'PWS_FETCH_STARTED',
    PWS_FETCH_COMPLETED: 'PWS_FETCH_COMPLETED',
    PWS_FETCH_FAILED: 'PWS_FETCH_FAILED',
}

/* ACTION CREATORS */
const fetchPwsStarted = () => ({
    type: Types.PWS_FETCH_STARTED,
})

const fetchPwsCompleted = pws => ({
    type: Types.PWS_FETCH_COMPLETED,
    pws,
})

const fetchPwsFailed = error => ({
    type: Types.PWS_FETCH_FAILED,
    error,
})

/* THUNKS */
export const fetchPws = () => async (dispatch: any) => {
    try {
        dispatch(fetchPwsStarted())
        const data = await api.pws.getConditions()
        dispatch(fetchPwsCompleted(data))
    } catch (error) {
        dispatch(fetchPwsFailed(error))
    }
}

type State = {
    isWorking: boolean,
    device: mixed,
    error: mixed,
}

type Action =
    | { type: string }
    | { type: string, pws: mixed }
    | { type: string, error: mixed }

const initialState = {
    isWorking: false,
    device: null,
    error: null,
}

/* REDUCER */
export const pws = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case Types.PWS_FETCH_STARTED:
            return {
                ...state,
                isWorking: true,
            }
        case Types.PWS_FETCH_COMPLETED:
            return {
                ...state,
                isWorking: false,
                device: action.pws && action.pws,
            }
        case Types.PWS_FETCH_FAILED:
            return {
                ...state,
                error: action.error && action.error,
            }
        default:
            return state
    }
}
