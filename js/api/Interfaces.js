// @flow
import { Point } from '../types'

interface ServiceInterface {
    endpoint: () => string;
}

export interface NwsInterface extends ServiceInterface {
    getPoint: mixed => Promise<*>;
    getQuickForecast: Point => Promise<*>;
    getDetailedForecast: Point => Promise<*>;
    getHourleyForecast: Point => Promise<*>;
}

export interface PwsInterface extends ServiceInterface {
    getConditions: mixed => Promise<*>;
    subscribe: () => void;
}
