// @flow
import moment from 'moment'
import { LayoutAnimation } from 'react-native'
export const formatTimeTick = (val: string) => {
    const date = moment(val).local()
    const formatted = date.format('h:mma')
    return formatted
}

const RANGE = 360 / 16

export const calcWindDirectionText = (windDir: number) => {
    const DIRECTIONS = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ]
    const val = parseInt(windDir / RANGE + 0.5)
    return DIRECTIONS[val % 16]
}

export const simpleAnimate = () =>
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

export { consumeMultipleDurations } from './nws'
