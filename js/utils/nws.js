// @flow
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

type NWSValue = {
    validTime: string,
    value: number,
}

type NWSNode = {
    values: Array<NWSValue>,
    sourceUnit: string,
    uom: string,
}

const arrayifyNwsValues = (
    acc: Array<NWSValue>,
    dur: NWSValue,
    idx: number,
    array: Array<NWSValue>,
) => {
    const { validTime, value } = dur
    let hours = arrayifyDuration(validTime)
    const correctedHours = isLast(idx, array) ? hours : hours.slice(0, -1)
    const returnValues = correctedHours.map(hour => ({
        validTime: hour,
        value,
    }))
    return [...acc, ...returnValues]
}

const arrayifyDuration = (dateInt: string) => {
    let [dateStr, interval] = dateInt.split('/')
    let time = moment(dateStr).utc()
    const duration = moment.duration(interval)
    const end = time.clone().add(duration)
    const range = moment.range(time, end)
    const hours = Array.from(range.by('hours'))
    return hours
}

export const consumeMultipleDurations = (durations: Array<NWSValue>) => {
    return durations.reduce(arrayifyNwsValues, [])
}

const divideValuesByDay = (values: Array<NWSValue>) => {
    const structure = {}
    values.forEach(val => {
        const date = val.validTime.format('MM/DD')
        if (structure[date]) {
            structure[date].push(val)
        } else {
            structure[date] = [val]
        }
    })
    return Object.values(structure)
}

export const getValues = (node: NWSNode) => {
    const values = consumeMultipleDurations(node.values)
    return values
}

export const getDividedValues = (node: NWSNode) => {
    const values = consumeMultipleDurations(node.values)
    const divided = divideValuesByDay(values)
    return divided
}

const isLast = (idx, array) => array.length === idx + 1

export const isMidnight = (time: moment) => {
    const midnight = moment({ hour: 24, minute: 0 })
    return time.isSame(midnight)
}
