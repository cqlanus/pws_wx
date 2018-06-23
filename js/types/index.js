// @flow
export class Point {
    lat: string
    lng: string

    constructor(coords: Coords) {
        const { latitude, longitude } = coords
        this.lat = `${latitude}`
        this.lng = `${longitude}`
    }
}

export type Location = {
    latitude: number,
    longitude: number,
}

export type Coords = {
    latitude: number,
    longitude: number,
    altitude: number,
}

export type { Reading, Device } from './pws'
