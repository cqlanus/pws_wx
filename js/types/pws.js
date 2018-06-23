// @flow

export type Device = Array<Reading>

export type Reading = {
    dateutc: number,
    winddir: number,
    windspeedmph: number,
    windgustmph: number,
    maxdailygust: number,
    tempf: number,
    hourlyrainin: number,
    dailyrainin: number,
    weeklyrainin: number,
    monthlyrainin: number,
    totalrainin: number,
    baromrelin: number,
    baromabsin: number,
    humidity: number,
    tempinf: number,
    humidityin: number,
    uv: number,
    solarradiation: number,
    feelsLike: number,
    dewPoint: number,
    lastRain: string,
    date: string,
}

export type CurrentWindData = {
    winddir: number,
    windspeedmph: number,
    windgustmph: number,
    maxdailygust: number,
}

export type CurrentTempData = {
    tempf: number,
    humidity: number,
    dewPoint: number,
    feelsLike: number,
}

export type CurrentRainData = {
    hourlyrainin: number,
    dailyrainin: number,
    weeklyrainin: number,
    monthlyrainin: number,
    totalrainin: number,
    lastRain: number,
}

export type CurrentPressureData = { baromrelin: number, baromabsin: number }

export type CurrentSolarData = {
    solarradiation: number,
    uv: number,
}
