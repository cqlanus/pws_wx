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
import { Colors } from '../../resources'
const THEME = [Colors.blue, Colors.red, Colors.green, Colors.yellow]

type Props = {
    lastDay: Device,
}

export class WindGraph extends Component<Props> {
    render() {
        const { gustLine, windDir, axisPadding } = styles
        const { lastDay } = this.props
        const direction = lastDay.map(r => r.winddir)
        const dates = lastDay.map(reading => reading.date)

        const maxGraph = 8
        const maxDirection = 360 / maxGraph

        return (
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                <ScrollView horizontal>
                    <VictoryChart width={800} theme={VictoryTheme.material}>
                        <VictoryGroup colorScale={THEME}>
                            <VictoryLine
                                data={lastDay}
                                y={d => d.windspeedmph}
                            />
                            <VictoryLine
                                data={direction}
                                y={d => d / maxDirection}
                                style={{ data: windDir }}
                            />
                            <VictoryLine
                                style={{ data: gustLine }}
                                data={lastDay}
                                y={d => d.windgustmph}
                            />
                        </VictoryGroup>
                        <VictoryAxis
                            tickValues={dates}
                            tickCount={12}
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
                            tickValues={[2, 4, 6, 8]}
                            orientation={'right'}
                            tickFormat={d =>
                                calcWindDirectionText(d * maxDirection)
                            }
                            label={'direction'}
                            style={{ axisLabel: axisPadding }}
                        />
                        <VictoryLegend
                            orientation={'horizontal'}
                            colorScale={THEME}
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
