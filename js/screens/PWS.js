// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TemperatureCard, TitleHeader } from '../components/widgets'
import { Colors } from '../resources'
import { fetchPws, getTemperatureData } from '../redux'

type Props = {
    tempData: any,
    fetchPws: () => void,
}

class PWS extends Component<Props> {
    componentDidMount() {
        this.props.fetchPws()
    }

    render() {
        const { container, scrollView } = styles
        const { tempData } = this.props
        return (
            <View style={container}>
                <TitleHeader title={'PWS WX'} />
                <ScrollView style={scrollView}>
                    {tempData && <TemperatureCard tempData={tempData} />}
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
})

const mapState = state => {
    return {
        tempData: getTemperatureData(state),
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
