// @flow
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { StyledText, Row } from '.'
import { Colors } from '../../resources'

type Props = {
    title: string,
    image: mixed,
    style: mixed,
    handlePress: () => void,
}

export class CardHeader extends Component<Props> {
    render() {
        const { title, image, style, handlePress } = this.props
        const { container, titleStyle, row } = styles
        return (
            <TouchableOpacity
                activeOpacity={1}
                sytle={[container]}
                onPress={handlePress}>
                <Row style={[row, style]}>
                    {image}
                    <StyledText style={titleStyle}>{title}</StyledText>
                </Row>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    titleStyle: {
        fontSize: 24,
        textAlign: 'right',
    },
    imageStyle: {
        fontSize: 40,
        color: Colors.blue,
    },
})
