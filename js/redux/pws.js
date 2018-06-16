// @flow
import { api } from '../api/ApiManager'
import { createSelector } from 'reselect'

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
    currentResult: mixed,
    error: mixed,
}

type Action =
    | { type: string }
    | { type: string, pws: Array<*> }
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
            if (action.pws) {
                const [currentResult, ...rest] = action.pws
                return {
                    ...state,
                    isWorking: false,
                    currentResult,
                    device: [currentResult, ...rest],
                }
            } else {
                return state
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

/* SELECTORS */
export const getDevice = (state: { pws: State }) => {
    return state.pws && state.pws.device && state.pws.device
}

const getCurrentConditions = createSelector([getDevice], device => {
    return device && device[0]
})

export const getTemperatureData = (conditions: any) => {
    const { date, tempf, feelsLike, dewPoint, humidity } = conditions
    return { date, tempf, feelsLike, dewPoint, humidity }
}

export const getWindData = (conditions: any) => {
    const {
        date,
        winddir,
        windspeedmph,
        windgustmph,
        maxdailygust,
    } = conditions
    return { date, winddir, windspeedmph, windgustmph, maxdailygust }
}

export const getRainData = createSelector(
    [getCurrentConditions],
    conditions => {
        if (conditions) {
            const {
                date,
                hourlyrainin,
                dailyrainin,
                weeklyrainin,
                monthlyrainin,
                totalrainin,
                lastRain,
            } = conditions
            return {
                date,
                hourlyrainin,
                dailyrainin,
                weeklyrainin,
                monthlyrainin,
                totalrainin,
                lastRain,
            }
        }
    },
)

export const getPressureData = (conditions: any) => {
    const { date, baromrelin, baromabsin } = conditions
    return { date, baromrelin, baromabsin }
}

export const getIndoorData = createSelector(
    [getCurrentConditions],
    conditions => {
        if (conditions) {
            const { date, tempinf, humidityin } = conditions
            return { date, tempinf, humidityin }
        }
    },
)

export const getSolarData = createSelector(
    [getCurrentConditions],
    conditions => {
        if (conditions) {
            const { date, uv, solarradiation } = conditions
            return { date, uv, solarradiation }
        }
    },
)
