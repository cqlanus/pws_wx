// @flow
import { PwsInterface, Endpoint } from '..'

const apiKey =
    '1989f971b74e4a07a3506b2013dd5ef8b88b64961fc5440a8e151dd909ce88ed'
const applicationKey =
    'deb30be1540b40aca4f18ed3007a6017505cbd21e6cf4ae3bc360e234573e0b8'

const API_URL = 'https://api.ambientweather.net/'
const AW_API_URL = API_URL + 'v1/devices/'
export class PwsService implements PwsInterface {
    endpoint = () => Endpoint.pws

    url = (macAddress: string = '') =>
        AW_API_URL +
        macAddress +
        '?apiKey=' +
        apiKey +
        '&applicationKey=' +
        applicationKey

    _userDevices = async () => {
        const response = await fetch(this.url())
        const json = await response.json()
        return json
    }

    getAllDeviceConditions = () => {}

    getConditions = async () => {
        const macAddress = 'DC:4F:22:20:51:A5'
        const url = this.url(macAddress) /*  + '&limit=10' */
        const data = await fetch(url)
        return await data.json()
    }

    subscribe = () => {
        // this.api.connect()
        // this.api.on('connect', () =>
        //     console.log('Connected to Ambient Weather Realtime API!'),
        // )
        // this.api.on('subscribed', data => {
        //     console.log('Subscribed to ' + data.devices.length + ' device(s): ')
        //     console.log(data.devices.map(getName).join(', '))
        // })
        // this.api.on('data', data => {
        //     console.log(
        //         data.date +
        //             ' - ' +
        //             getName(data.device) +
        //             ' current outdoor temperature is: ' +
        //             data.tempf +
        //             '°F',
        //     )
        // })
        // this.api.subscribe(apiKey)
    }
}

const getName = device => device.info.name
