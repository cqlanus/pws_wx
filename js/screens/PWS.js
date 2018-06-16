// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import {
    TemperatureCard,
    WindCard,
    TitleHeader,
    Loader,
    PressureCard,
} from '../components/widgets'
import {
    fetchPws,
    getTemperatureData,
    getWindData,
    getPressureData,
} from '../redux'

type Props = {
    currentResult: any,
    isWorking: boolean,
    fetchPws: () => void,
}

class PWS extends Component<Props> {
    componentDidMount() {
        this.props.fetchPws()
    }

    _renderCards = () => {
        const { currentResult } = this.props
        const { cardContainer } = styles
        if (currentResult) {
            const tempData = getTemperatureData(currentResult)
            const windData = getWindData(currentResult)
            const pressureData = getPressureData(currentResult)
            return (
                <View style={cardContainer}>
                    <TemperatureCard tempData={tempData} />
                    <WindCard windData={windData} />
                    <PressureCard pressureData={pressureData} />
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
    cardContainer: {
        marginTop: 10,
    },
})

const mapState = state => {
    return {
        isWorking: state.pws.isWorking,
        pws: state.pws,
        currentResult: state.pws.currentResult,
        // tempData: getTemperatureData(state),
        // windData: getWindData(state),
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
