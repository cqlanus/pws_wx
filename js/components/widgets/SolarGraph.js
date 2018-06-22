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

type Props = {
    lastDay: Device,
}

const UV_INDEX_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export class SolarGraph extends Component<Props> {
    render() {
        const { lastDay } = this.props
        const solarRadiation = lastDay.map(r => r.solarradiation)
        const maxSolar = Math.max(...solarRadiation)
        const maxUv = Math.max(...UV_INDEX_VALUES)
        const proportion = maxSolar / maxUv
        const uvIdx = lastDay.map(r => r.uv).map(val => val * proportion)
        const dates = lastDay.map(reading => reading.date)
        const { axisPadding } = styles
        return (
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                <ScrollView horizontal>
                    <VictoryChart width={800} theme={VictoryTheme.material}>
                        <VictoryGroup colorScale={'qualitative'}>
                            <VictoryLine data={solarRadiation} />
                            <VictoryLine data={uvIdx} />
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
                        <VictoryAxis
                            // tickValues={UV_INDEX_VALUES}
                            tickFormat={d => parseInt(d / proportion)}
                            orientation={'right'}
                            dependentAxis
                        />
                        <VictoryLegend
                            orientation={'horizontal'}
                            colorScale={'qualitative'}
                            x={50}
                            y={10}
                            data={[
                                { name: 'solar radiation' },
                                { name: 'uv index' },
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
