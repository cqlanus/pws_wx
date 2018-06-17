// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardHeader } from '.'
import { Colors } from '../../resources'

type Props = {
    children: any,
    initial: boolean,
    icon: mixed,
    handlePress: () => void,
    title: string,
}

export class PwsCard extends Component<Props> {
    static defaultProps = {
        handlePress: () => {},
    }
    render() {
        const { container, card, first } = styles
        const { initial, icon, handlePress, title } = this.props
        return (
            <View style={[container, initial && first]}>
                <Card style={card}>
                    <CardHeader
                        handlePress={handlePress}
                        title={title}
                        image={icon}
                    />
                    {this.props.children}
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    card: {
        width: '98%',
        flex: 1,
        backgroundColor: Colors.white,
    },
    first: {
        marginTop: 0,
    },
})
