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
    VictoryScatter,
} from 'victory-native'
import { formatTimeTick, calcWindDirectionText } from '../../utils'
import type { Device } from '../../types'

type Props = {
    lastDay: Device,
}

export class WindGraph extends Component<Props> {
    render() {
        const { gustLine, windDir, axisPadding } = styles
        const { lastDay } = this.props
        const gusts = lastDay.map(reading => reading.windgustmph)
        const direction = lastDay.map(r => r.winddir)
        const dates = lastDay.map(reading => reading.date)
        const proportion = Math.max(...gusts) / Math.max(...direction)
        const mappedDirection = direction.map(dir => dir * proportion)
        return (
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                <ScrollView horizontal>
                    <VictoryChart width={800} theme={VictoryTheme.material}>
                        <VictoryGroup colorScale={'qualitative'}>
                            <VictoryLine
                                data={lastDay}
                                y={d => d.windspeedmph}
                            />
                            <VictoryScatter
                                data={mappedDirection}
                                style={{ data: windDir }}
                            />
                            <VictoryLine
                                style={{ data: gustLine }}
                                data={gusts}
                            />
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
                        <VictoryAxis
                            dependentAxis
                            label={'speed (mph)'}
                            style={{ axisLabel: axisPadding }}
                        />
                        <VictoryAxis
                            dependentAxis
                            tickValues={DIRECTIONS}
                            tickFormat={d => calcWindDirectionText(d * 60)}
                            orientation={'right'}
                            label={'direction'}
                            style={{ axisLabel: axisPadding }}
                        />
                        <VictoryLegend
                            orientation={'horizontal'}
                            colorScale={'qualitative'}
                            x={50}
                            y={10}
                            data={[
                                { name: 'wind speed' },
                                { name: 'wind direction' },
                                { name: 'gust speed' },
                            ]}
                        />
                    </VictoryChart>
                </ScrollView>
            </View>
        )
    }
}

const DIRECTIONS = [1, 2, 3, 4, 5, 6]

const styles = {
    gustLine: {
        opacity: 0.6,
    },
    windDir: {
        opacity: 0.3,
    },
    axisPadding: {
        padding: 40,
    },
}
