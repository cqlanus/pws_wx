// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '../../resources'

type Props = {
    style: mixed,
    children: mixed,
}

export class Card extends Component<Props> {
    static defaultProps = {
        style: {},
        children: null,
    }

    render() {
        const { style, children } = this.props
        const { containerStyle } = styles
        return <View style={[containerStyle, style]}>{children}</View>
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: 4,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
})
