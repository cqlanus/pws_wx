// @flow
import { Endpoint, NwsInterface, Base, Path } from '../'
import type { Point } from '../../types'

export class NwsService implements NwsInterface {
    endpoint = () => Endpoint.nws

    getPoint = async (point: Point) => {
        const url = Base.nws() + Path.point((point: Point))
        const response = await fetch(url)
        return await response.json()
    }

    getQuickForecast = async (point: Point) => {
        const { properties } = await this.getPoint(point)
        const { forecast } = properties
        const response = await fetch(forecast)
        return await response.json()
    }

    getDetailedForecast = async (point: Point) => {
        const { properties } = await this.getPoint(point)
        const { forecastGridData } = properties
        const response = await fetch(forecastGridData)
        return await response.json()
    }
}
