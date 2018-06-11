// @flow
import { api } from '../api/ApiManager'

export const Types = {
    LOCATION_FETCH: 'LOCATION_FETCH',
    LOCATION_FETCH_STARTED: 'LOCATION_FETCH_STARTED',
    LOCATION_FETCH_COMPLETE: 'LOCATION_FETCH_COMPLETE',
    LOCATION_FETCH_FAILED: 'LOCATION_FETCH_FAILED',
}

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

export const fetchUserLocation = () => (dispatch: any) => {
    dispatch(fetchUserLocationStarted())
    fetch('https://ipinfo.io', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                dispatch(
                    fetchUserLocationFailed(
                        'An error occurred calling the location API',
                    ),
                )
            } else {
                return response.json()
            }
        })
        .then(json => {
            console.log(json)
            dispatch(fetchUserLocationComplete(json))
        })
        .catch(error =>
            dispatch(
                fetchUserLocationFailed(
                    'An error occurred calling the location API',
                ),
            ),
        )
}

export const getForecast = async () => {
    const point = { lat: '42.0034', lng: '-88.0586' }
    try {
        const response = await api.nws.getQuickForecast(point)
        return response
    } catch (error) {
        return { error }
    }
}

export const getDeviceData = async () => {
    try {
        const response = await api.pws.getConditions()
        return response
    } catch (error) {
        return { error }
    }
}
