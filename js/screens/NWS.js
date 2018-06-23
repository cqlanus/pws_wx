// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { StyledText, Row, Loader } from '../components/widgets'
import { Colors } from '../resources'
import { fetchNws, fetchUserLocation } from '../redux'
import type { Coords } from '../types'
import { Point } from '../types'

type Props = {
    fetchUserLocation: () => void,
    isWorking: boolean,
    coords: Coords,
    fetchNws: Point => void,
    forecast: any,
}

class NWS extends Component<Props> {
    componentDidMount() {
        const { fetchUserLocation } = this.props
        fetchUserLocation()
    }

    componentDidUpdate(prevProps) {
        const { coords } = this.props
        const { coords: lastCoords } = prevProps
        if (!lastCoords) {
            this._getForecast(coords)
        }
    }

    _getForecast = (coords: Coords) => {
        const { fetchNws } = this.props
        const point = new Point(coords)
        fetchNws(point)
    }

    render() {
        const { container } = styles
        const { isWorking, forecast } = this.props
        console.log('forecast', forecast)
        return <View style={container}>{isWorking && <Loader />}</View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const mapState = state => {
    return {
        isWorking: state.nws.isWorking,
        forecast: state.nws.forecast,
        coords: state.location.coords,
    }
}

const mapDispatch = dispatch => {
    return {
        fetchNws: point => dispatch(fetchNws(point)),
        fetchUserLocation: () => dispatch(fetchUserLocation()),
    }
}

export const NWSContainer = connect(
    mapState,
    mapDispatch,
)(NWS)
