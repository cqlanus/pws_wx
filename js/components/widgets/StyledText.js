// @flow
import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colors } from '../../resources'

type StyledTextProps = {
    style: mixed,
    children: mixed,
    numberOfLines: number,
    onPress: () => void,
}

class StyledText extends Component<StyledTextProps> {
    render() {
        const { customFont } = styles
        const { style, numberOfLines, children, onPress, ...rest } = this.props

        return (
            <Text
                {...rest}
                style={[customFont, style]}
                numberOfLines={numberOfLines}
                onPress={onPress}>
                {children}
            </Text>
        )
    }
}

export { StyledText }

const styles = StyleSheet.create({
    customFont: {
        color: Colors.black,
        fontSize: 14,
    },
})
