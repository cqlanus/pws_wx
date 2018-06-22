// @flow
import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryGroup,
    VictoryZoomContainer,
    VictoryAxis,
    VictoryLegend,
} from 'victory-native'
import type { Device } from '../../types'
import { formatTimeTick } from '../../utils'

type Props = {
    lastDay: Device,
}

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
                        <VictoryLine data={pressure} />
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
