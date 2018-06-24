// @flow
import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryGroup,
    VictoryAxis,
    VictoryLegend,
} from 'victory-native'
import type { Device } from '../../types'
import { formatTimeTick } from '../../utils'
import { Colors } from '../../resources'
const THEME = [Colors.blue, Colors.red, Colors.green, Colors.yellow]

type Props = {
    lastDay: Device,
}

export class RainGraph extends Component<Props> {
    render() {
        const { lastDay } = this.props
        const dailyRain = lastDay.map(r => r.dailyrainin)
        const hourlyRain = lastDay.map(r => r.hourlyrainin)
        const dates = lastDay.map(reading => reading.date)
        const { axisPadding } = styles
        return (
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                <ScrollView horizontal>
                    <VictoryChart width={800} theme={VictoryTheme.material}>
                        <VictoryGroup colorScale={THEME}>
                            <VictoryLine data={dailyRain} />
                            <VictoryLine data={hourlyRain} />
                        </VictoryGroup>
                        <VictoryAxis
                            fixLabelOverlap
                            tickValues={dates}
                            tickCount={10}
                            invertAxis
                            tickFormat={formatTimeTick}
                            label={'time'}
                            style={{ axisLabel: axisPadding }}
                        />
                        <VictoryAxis dependentAxis />
                        <VictoryLegend
                            orientation={'horizontal'}
                            colorScale={THEME}
                            x={50}
                            y={10}
                            data={[
                                { name: 'daily rain' },
                                { name: 'hourly rain' },
                            ]}
                        />
                    </VictoryChart>
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    axisPadding: {
        padding: 30,
    },
}
