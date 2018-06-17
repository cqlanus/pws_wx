// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { Row, StyledText, Card, CardHeader } from '.'
import { Colors, Icons, Images } from '../../resources'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
    rainData: any,
}

export class RainCard extends Component<Props> {
    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.rain} style={imageStyle} />
    }

    _renderRainTube = (rain: number, max: number) => {
        const TUBE_HEIGHT = 150
        const { barHeight, backgroundHeight } = calcBarHeights(
            rain,
            max,
            TUBE_HEIGHT,
        )
        const { backBar, foreBar } = styles
        return (
            <View>
                <View style={[backBar, { height: backgroundHeight }]} />
                <View style={[foreBar, { height: barHeight }]} />
            </View>
        )
    }

    _renderText = (rain: number, max: number, length: string) => {
        const { rainText, columnText, line } = styles
        return (
            <View style={columnText}>
                <Row>
                    <StyledText style={rainText}>{`${rain.toFixed(
                        2,
                    )}`}</StyledText>
                    <StyledText style={rainText}>{'in'}</StyledText>
                </Row>
                <View style={line} />
                <StyledText>{length}</StyledText>
            </View>
        )
    }

    _renderColumn = (rain: number, max: number, length: string) => {
        const { column } = styles
        return (
            <View style={column}>
                {this._renderRainTube(rain, max)}
                {this._renderText(rain, max, length)}
            </View>
        )
    }

    render() {
        const { container, card } = styles
        const {
            hourlyrainin,
            dailyrainin,
            weeklyrainin,
            monthlyrainin,
            totalrainin,
            lastRain,
        } = this.props.rainData
        return (
            <View style={container}>
                <Card style={card}>
                    <CardHeader title={'Rain'} image={this._renderIcon()} />
                    <Row style={{ justifyContent: 'center', padding: 20 }}>
                        {this._renderColumn(hourlyrainin, monthlyrainin, 'hr')}
                        {this._renderColumn(dailyrainin, monthlyrainin, 'day')}
                        {this._renderColumn(
                            weeklyrainin,
                            monthlyrainin,
                            'week',
                        )}
                        {this._renderColumn(
                            monthlyrainin,
                            monthlyrainin,
                            'month',
                        )}
                    </Row>
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
    imageStyle: {
        fontSize: 40,
        color: Colors.blue,
    },
    rainText: {
        color: Colors.blue,
        fontSize: 18,
    },
    backBar: {
        width: 30,
        backgroundColor: Colors.lightGrey,
    },
    foreBar: {
        width: 30,
        backgroundColor: Colors.blue,
    },
    column: {
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    line: {
        borderColor: Colors.yellow,
        borderWidth: 1,
        width: 50,
        marginVertical: 2,
    },
    columnText: {
        alignItems: 'center',
        marginTop: 5,
    },
})

const calcBarHeights = (rain: number, max: number, height: number) => {
    const barHeight = (rain / max) * height
    const backgroundHeight = height - barHeight
    return { barHeight, backgroundHeight }
}
