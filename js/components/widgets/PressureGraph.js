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

type Props = {
    lastDay: Device,
}
const THEME = [Colors.blue, Colors.red, Colors.green, Colors.yellow]
export class PressureGraph extends Component<Props> {
    render() {
        const { lastDay } = this.props
        const pressure = lastDay.map(r => r.baromrelin)
        const dates = lastDay.map(reading => reading.date)
        const { axisPadding } = styles
        return (
            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                <ScrollView horizontal>
                    <VictoryChart width={800} theme={VictoryTheme.material}>
                        <VictoryGroup colorScale={THEME}>
                            <VictoryLine data={pressure} />
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
