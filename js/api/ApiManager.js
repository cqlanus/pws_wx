// @flow
import { NwsInterface, PwsInterface } from '.'
import { NwsService, PwsService } from './services'

const apiConfig = {
    nws: NwsService,
    pws: PwsService,
    maps: '',
}

type ApiConfig = {
    nws: NwsInterface,
    pws: PwsInterface,
    maps: mixed,
}

class ApiManager {
    nws: PwsInterface
    pws: PwsInterface
    maps: mixed

    constructor(config: ApiConfig) {
        this.nws = new config.nws()
        this.pws = new config.pws()
        this.maps = config.maps
    }
}

export const api = new ApiManager(apiConfig)
