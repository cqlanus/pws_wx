// @flow
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { StyledText } from './'

type Props = {
    title: string,
}

export class StyledButton extends Component<Props> {
    static defaultProps = {
        title: 'Button',
    }

    render() {
        return (
            <TouchableOpacity {...this.props}>
                <View style={styles.button}>
                    <StyledText style={styles.buttonText}>
                        {this.props.title}
                    </StyledText>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 24,
        backgroundColor: '#f74902',
    },
    buttonText: {
        color: '#fff',
    },
})
