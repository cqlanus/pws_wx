// @flow
import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { StyledText, Row } from '.'
import { Colors } from '../../resources'

type Props = {
    title: string,
    image: mixed,
    style: mixed,
}

export class CardHeader extends Component<Props> {
    render() {
        const { title, image, style } = this.props
        const { container, titleStyle, imageStyle, row, line } = styles
        return (
            <View sytle={container}>
                <Row style={[row, style]}>
                    <Image source={image} style={imageStyle} />
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
        // alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    line: {
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.black,
        bottom: 20,
        zIndex: 1,
    },
    titleStyle: {
        fontSize: 20,
        textAlign: 'right',
    },
    imageStyle: {
        height: 50,
        width: 50,
        zIndex: 2,
        tintColor: Colors.blue,
    },
})
