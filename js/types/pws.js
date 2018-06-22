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
