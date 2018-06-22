// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import {
    TemperatureCard,
    WindCard,
    TitleHeader,
    RainCard,
    PressureCard,
    SolarCard,
} from '../components/widgets'
import {
    fetchPws,
    getTemperatureData,
    getWindData,
    getPressureData,
    getRainData,
    getSolarData,
} from '../redux'

type Props = {
    currentResult: any,
    isWorking: boolean,
    fetchPws: () => void,
    pws: any,
}

class PWS extends Component<Props> {
    componentDidMount() {
        this.props.fetchPws()
    }

    _renderCards = () => {
        const { currentResult, pws } = this.props
        const { cardContainer } = styles
        if (currentResult) {
            const { device } = pws
            const tempData = getTemperatureData(currentResult)
            const windData = getWindData(currentResult)
            const pressureData = getPressureData(currentResult)
            const rainData = getRainData(currentResult)
            const solarData = getSolarData(currentResult)
            return (
                <View style={cardContainer}>
                    <TemperatureCard tempData={tempData} device={device} />
                    <WindCard windData={windData} device={device} />
                    <PressureCard pressureData={pressureData} device={device} />
                    <RainCard rainData={rainData} device={device} />
                    <SolarCard solarData={solarData} device={device} />
                </View>
            )
        }
    }

    render() {
        const { container, scrollView } = styles
        const { isWorking } = this.props
        return (
            <View style={container}>
                <TitleHeader title={'PWS WX'} />
                <ScrollView
                    style={scrollView}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isWorking}
                            onRefresh={this.props.fetchPws}
                        />
                    }>
                    {this._renderCards()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%%',
    },
    cardContainer: {},
})

const mapState = state => {
    return {
        isWorking: state.pws.isWorking,
        pws: state.pws,
        currentResult: state.pws.currentResult,
    }
}

const mapDispatch = dispatch => {
    return {
        fetchPws: () => dispatch(fetchPws()),
    }
}

export const PWSContainer = connect(
    mapState,
    mapDispatch,
)(PWS)
