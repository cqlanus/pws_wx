// @flow
import React, { Component } from 'react'
import { View } from 'react-native'
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryGroup,
} from 'victory-native'

type Props = {
    lastDay: Array<*>,
}

export class TemperatureGraph extends Component<Props> {
    render() {
        const { lastDay } = this.props
        const temps = lastDay.map(reading => reading.tempf)
        const dewPoints = lastDay.map(reading => reading.dewPoint)
        const humidity = lastDay.map(reading => reading.humidity)
        return (
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryGroup colorScale={'qualitative'}>
                    <VictoryLine data={temps} />
                    <VictoryLine data={dewPoints} />
                    <VictoryLine data={humidity} />
                </VictoryGroup>
            </VictoryChart>
        )
    }
}
