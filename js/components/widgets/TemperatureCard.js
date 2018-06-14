// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Card, StyledText, CardHeader } from '.'
import { Colors, Images } from '../../resources'
import { getTemperatureData } from '../../redux'

type Props = {
    tempData: TempData,
}

type TempData = {
    tempf: number,
    humidity: number,
    dewPoint: number,
    feelsLike: number,
}

export class TemperatureCard extends Component<Props> {
    render() {
        const { container, card, cardHeader, cardContainer } = styles
        const { tempData } = this.props
        const { tempf, dewPoint, feelsLike, humidity } = tempData
        return (
            <View style={container}>
                <Card style={card}>
                    <CardHeader
                        title={'Outdoor'}
                        image={Images.icon1}
                        style={cardHeader}
                    />
                    <View style={cardContainer}>
                        <StyledText>{'Temperature Card'}</StyledText>
                        <StyledText>{`It is ${tempf} degrees outside now.`}</StyledText>
                    </View>
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
    },
    card: {
        width: '98%',
        backgroundColor: Colors.white,
    },
    cardHeader: {},
    cardContainer: {
        padding: 10,
    },
})

// const mapState = state => {
//     console.log('???', state.device)
//     const { tempf, dewPoint, feelsLike, humidity } = getTemperatureData(state)
//     return { tempf, dewPoint, feelsLike, humidity }
// }
// export const TemperatureCard = connect(
//     mapState,
//     null,
// )(TemperatureCardComponent)
