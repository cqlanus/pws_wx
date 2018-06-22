// @flow
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText } from '.'
import { Colors } from '../../resources'

type Props = {
    onPress: () => void,
    title: string,
}

export class FlipButton extends Component<Props> {
    static defaultProps = {
        title: 'Flip',
    }

    render() {
        const { title, onPress } = this.props
        const { button } = styles
        return (
            <TouchableOpacity onPress={onPress} style={button}>
                <StyledText style={{ color: Colors.white }}>{title}</StyledText>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
    },
})
