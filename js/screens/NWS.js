// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView } from 'react-native'
import { StyledText, Row, Loader } from '../components/widgets'
import { Colors } from '../resources'
import { fetchNws, fetchUserLocation } from '../redux'
import type { Coords } from '../types'
import { Point } from '../types'
import { calcWindDirectionText, getValues } from '../utils'

import {
    VictoryChart,
    VictoryLine,
    VictoryGroup,
    VictoryTheme,
    VictoryArea,
    VictoryAxis,
    VictoryScatter,
} from 'victory-native'

type Props = {
    fetchUserLocation: () => void,
    isWorking: boolean,
    coords: Coords,
    fetchNws: Point => void,
    forecast: any,
}

const THEME = [Colors.blue, Colors.red, Colors.green, Colors.yellow]
const y = d => d.value
const x = d => d.validTime

class NWS extends Component<Props> {
    componentDidMount() {
        const { fetchUserLocation } = this.props
        fetchUserLocation()
    }

    componentDidUpdate(prevProps) {
        const { coords } = this.props
        const { coords: lastCoords } = prevProps
        if (!lastCoords) {
            this._getForecast(coords)
        }
    }

    _getForecast = (coords: Coords) => {
        const { fetchNws } = this.props
        const point = new Point(coords)
        fetchNws(point)
    }

    _x = val => val.validtime

    _format = val => val.format('ha').slice(0, -1)

    _renderTempForecast = () => {
        const { forecast } = this.props
        const {
            dewpoint,
            temperature,
            apparentTemperature,
        } = forecast.properties

        const temps = getValues(temperature)
        const dews = getValues(dewpoint)
        const feelsLike = getValues(apparentTemperature)
        const dates = temps.map(x)

        return (
            <VictoryChart
                width={800}
                height={250}
                theme={VictoryTheme.material}>
                <VictoryGroup colorScale={THEME}>
                    <VictoryLine data={feelsLike} y={y} x={x} />
                    <VictoryLine data={temps} y={y} x={x} />
                    <VictoryLine data={dews} y={y} x={x} />
                </VictoryGroup>
                <VictoryAxis
                    tickValues={dates}
                    tickFormat={this._format}
                    tickCount={24}
                />
                <VictoryAxis dependentAxis />
                <VictoryAxis dependentAxis orientation={'right'} />
            </VictoryChart>
        )
    }

    _renderRainForecast = () => {
        const { forecast } = this.props
        const {
            probabilityOfPrecipitation,
            relativeHumidity,
            skyCover,
            quantitativePrecipitation,
        } = forecast.properties
        const precip = getValues(probabilityOfPrecipitation)
        const humidity = getValues(relativeHumidity)
        const clouds = getValues(skyCover)
        const rain = getValues(quantitativePrecipitation)
        const maxRain = 10 // cm
        const maxY = 100
        const dates = precip.map(x)

        return (
            <VictoryChart
                width={800}
                height={250}
                theme={VictoryTheme.material}>
                <VictoryGroup colorScale={THEME}>
                    <VictoryLine data={humidity} y={y} x={x} />
                    <VictoryLine data={clouds} y={y} x={x} />
                    <VictoryArea data={precip} y={y} x={x} />
                    <VictoryArea
                        data={rain}
                        x={x}
                        y={d => (d.value / maxRain) * (maxY / 2)}
                    />
                </VictoryGroup>
                <VictoryAxis
                    tickValues={dates}
                    tickFormat={this._format}
                    tickCount={24}
                />
                <VictoryAxis dependentAxis />
                <VictoryAxis
                    dependentAxis
                    tickValues={[25, 50, 75, 100]}
                    tickFormat={d => parseInt(d * maxRain) / (maxY / 2)}
                    orientation={'right'}
                />
            </VictoryChart>
        )
    }

    _renderWindGraph = () => {
        const { forecast } = this.props
        const { windSpeed, windGust, windDirection } = forecast.properties
        const wind = getValues(windSpeed)
        const gusts = getValues(windGust)
        const direction = getValues(windDirection)

        const maxGraph = 20
        const maxDirection = 360 / maxGraph
        const dates = wind.map(x)

        return (
            <VictoryChart
                width={800}
                height={250}
                theme={VictoryTheme.material}>
                <VictoryGroup colorScale={THEME}>
                    <VictoryLine data={wind} y={y} x={x} />
                    <VictoryLine data={gusts} y={y} x={x} />
                    <VictoryScatter
                        data={direction}
                        x={x}
                        y={d => d.value / maxDirection}
                    />
                </VictoryGroup>
                <VictoryAxis
                    tickValues={dates}
                    tickFormat={this._format}
                    tickCount={24}
                />
                <VictoryAxis dependentAxis />
                <VictoryAxis
                    dependentAxis
                    tickValues={[5, 10, 15, 20]}
                    orientation={'right'}
                    tickFormat={d => calcWindDirectionText(d * maxDirection)}
                />
            </VictoryChart>
        )
    }

    _renderForecast = () => {
        return (
            <ScrollView horizontal>
                <ScrollView>
                    {this._renderTempForecast()}
                    {this._renderRainForecast()}
                    {this._renderWindGraph()}
                </ScrollView>
            </ScrollView>
        )
    }

    render() {
        const { container } = styles
        const { isWorking, forecast } = this.props
        return forecast ? (
            this._renderForecast()
        ) : (
            <View style={container}>{isWorking && <Loader />}</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const mapState = state => {
    return {
        isWorking: state.nws.isWorking,
        forecast: state.nws.forecast,
        coords: state.location.coords,
    }
}

const mapDispatch = dispatch => {
    return {
        fetchNws: point => dispatch(fetchNws(point)),
        fetchUserLocation: () => dispatch(fetchUserLocation()),
    }
}

export const NWSContainer = connect(
    mapState,
    mapDispatch,
)(NWS)
