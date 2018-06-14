// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { StyledText } from '.'
import { Colors } from '../../resources'

type Props = {
    title: string,
}

export class TitleHeader extends Component<Props> {
    render() {
        const { container, titleStyle } = styles
        const { title } = this.props
        return (
            <View style={container}>
                <StyledText style={titleStyle}>{title}</StyledText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.blue,
        padding: 10,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        color: Colors.white,
        fontSize: 18,
    },
})
