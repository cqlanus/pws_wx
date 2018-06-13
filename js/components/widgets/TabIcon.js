// @flow
import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

export class TabIcon extends Component<*> {
    render() {
        const {
            image,
            focused,
            activeTintColor,
            inactiveTintColor,
        } = this.props
        const { container, icon } = styles
        var tintColor = focused ? activeTintColor : inactiveTintColor
        return (
            <View style={container}>
                <Image
                    style={icon}
                    source={image}
                    tintColor={tintColor}
                    resizeMode={'contain'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 24,
        width: 24,
    },
})
