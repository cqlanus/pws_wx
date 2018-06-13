// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

type Props = {
    style: mixed,
    children: mixed,
}

export class Row extends Component<Props> {
    render() {
        const { style, children } = this.props
        return <View style={[styles.row, style]}>{children}</View>
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
})
