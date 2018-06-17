// @flow
import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { StyledText, Row } from '.'
import { Colors } from '../../resources'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    title: string,
    image: mixed,
    style: mixed,
}

export class CardHeader extends Component<Props> {
    render() {
        const { title, image, style } = this.props
        const { container, titleStyle, row, line } = styles
        return (
            <View sytle={container}>
                <Row style={[row, style]}>
                    {image}
                    <StyledText style={titleStyle}>{title}</StyledText>
                </Row>
                <View style={line} />
            </View>
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
    line: {
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.black,
        zIndex: 1,
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
