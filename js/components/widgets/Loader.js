// @flow
import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Colors } from '../../resources'

type Props = {
    color: string,
}

export class Loader extends Component<Props> {
    static defaultProps = {
        color: Colors.blue,
    }
    render() {
        const { loading } = styles
        const { color } = this.props
        return (
            <View style={loading}>
                <ActivityIndicator color={color} size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.translucentWhite,
    },
})
