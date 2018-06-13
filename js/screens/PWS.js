// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Row, Card, StyledText } from '../components/widgets'
import { Colors } from '../resources'
import { fetchPws } from '../redux'

type Props = {
    device: any,
    fetchPws: () => void,
}

class PWS extends Component<Props> {
    componentDidMount() {
        console.log('mount')
        this.props.fetchPws()
    }

    render() {
        const { container, card } = styles
        console.log('hello')
        if (this.props.device) {
            console.log(this.props.device)
        }
        return (
            <View style={container}>
                <Card style={card}>
                    <StyledText>This is the PWS landing screen</StyledText>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '95%',
        padding: 20,
        backgroundColor: Colors.white,
    },
})

const mapState = state => {
    return {
        device: state.pws.device,
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
