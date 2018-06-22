// @flow
import React, { Component } from 'react'
import { View, ScrollView, Dimensions, LayoutAnimation } from 'react-native'
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryGroup,
    VictoryAxis,
    VictoryLegend,
} from 'victory-native'
import { formatTimeTick } from '../../utils'
import type { Device } from '../../types'

type Props = {
    lastDay: Device,
}

type State = {
    expanded: boolean,
}

const SCREEN = Dimensions.get('window').width
const LARGE = 600
export class TemperatureGraph extends Component<Props, State> {
    state = {
        expanded: false,
    }

    _toggleWidth = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState(prev => ({ expanded: !prev.expanded }))
    }

    render() {
        const { lastDay } = this.props
        const temps = lastDay.map(reading => reading.tempf)
        const dewPoints = lastDay.map(reading => reading.dewPoint)
        const minDewPoint = Math.min(...dewPoints) - 20
        const maxTemp = Math.max(...temps) + 10
        const domain = [minDewPoint, maxTemp]
        const humidity = lastDay.map(reading => reading.humidity)
        const dates = lastDay.map(reading => reading.date)
        const { expanded } = this.state
        const width = expanded ? LARGE : SCREEN
        return (
            <View>
                <ScrollView horizontal>
                    <VictoryChart width={800} theme={VictoryTheme.material}>
                        <VictoryGroup colorScale={'qualitative'}>
                            <VictoryLine data={temps} />
                            <VictoryLine data={dewPoints} />
                            <VictoryLine data={humidity} />
                        </VictoryGroup>
                        <VictoryAxis
                            fixLabelOverlap
                            tickValues={dates}
                            tickCount={10}
                            invertAxis
                            tickFormat={formatTimeTick}
                        />
                        <VictoryAxis
                            label={'temp'}
                            dependentAxis
                            domain={domain}
                            style={{ axisLabel: { padding: 30 } }}
                        />
                        <VictoryAxis
                            label={'humidity'}
                            dependentAxis
                            orientation="right"
                            domain={[
                                Math.min(...humidity),
                                Math.max(...humidity),
                            ]}
                            style={{ axisLabel: { padding: 30 } }}
                        />
                        <VictoryLegend
                            orientation={'horizontal'}
                            colorScale={'qualitative'}
                            x={50}
                            y={10}
                            data={[
                                { name: 'temps' },
                                { name: 'dew point' },
                                { name: 'humidity' },
                            ]}
                        />
                    </VictoryChart>
                </ScrollView>
            </View>
        )
    }
}
