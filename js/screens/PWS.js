// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import {
    TemperatureCard,
    WindCard,
    TitleHeader,
    Loader,
} from '../components/widgets'
import { fetchPws, getTemperatureData, getWindData } from '../redux'

type Props = {
    tempData: any,
    windData: any,
    device: any,
    isWorking: boolean,
    fetchPws: () => void,
}

class PWS extends Component<Props> {
    componentDidMount() {
        this.props.fetchPws()
    }

    _renderCards = () => {
        const { device, tempData, windData } = this.props
        const { cardContainer } = styles
        if (device) {
            return (
                <View style={cardContainer}>
                    <TemperatureCard tempData={tempData} />
                    <WindCard windData={windData} />
                </View>
            )
        }
    }

    render() {
        const { container, scrollView, cardContainer } = styles
        const { tempData, isWorking, device } = this.props
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
        device: state.pws.device,
        tempData: getTemperatureData(state),
        windData: getWindData(state),
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
