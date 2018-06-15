// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Row, Card, StyledText, CardHeader } from '.'
import { Colors, Icons } from '../../resources'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    tempData: TempData,
}

type TempData = {
    tempf: number,
    humidity: number,
    dewPoint: number,
    feelsLike: number,
}

const DEGREE = '°'
const PERCENT = '%'
export class TemperatureCard extends Component<Props> {
    _greyText = (text: string) => (
        <StyledText style={styles.currentText}>{text}</StyledText>
    )

    _renderCurrentTemp = () => {
        if (!this.props.tempData) {
            return null
        }
        const { tempf } = this.props.tempData
        const { currentTemp, currentTempContainer } = styles
        return (
            <View style={currentTempContainer}>
                {this._greyText('CURRENT')}
                <StyledText
                    style={currentTemp}>{`${tempf}${DEGREE}`}</StyledText>
            </View>
        )
    }

    _renderRight = () => {
        const { rightView } = styles
        const { dewPoint, feelsLike, humidity } = this.props.tempData
        return (
            <View style={rightView}>
                {this._renderRightItem(dewPoint, 'DEW POINT', DEGREE)}
                {this._renderRightItem(humidity, 'HUMIDITY', PERCENT)}
                {this._renderRightItem(feelsLike, 'FEELS LIKE', DEGREE)}
            </View>
        )
    }

    _renderRightItem = (value: number, title: string, unit: string) => {
        const { rightItem, rightItemContainer } = styles

        return (
            <View style={rightItemContainer}>
                {this._greyText(`${title}`)}
                <StyledText style={rightItem}>{`${value.toFixed(
                    1,
                )}${unit}`}</StyledText>
            </View>
        )
    }

    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.thermometer} style={imageStyle} />
    }

    render() {
        const { container, card, cardContainer, row } = styles
        return (
            <View style={container}>
                <Card style={card}>
                    <CardHeader
                        title={'Temperature'}
                        image={this._renderIcon()}
                    />
                    <Row style={row}>
                        <View style={cardContainer}>
                            {this._renderCurrentTemp()}
                        </View>
                        {this._renderRight()}
                    </Row>
                </Card>
            </View>
        )
    }
}
const BORDER_HEIGHT = 120
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    card: {
        width: '98%',
        flex: 1,
        backgroundColor: Colors.white,
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        padding: 10,
        alignItems: 'center',
        flex: 3,
    },
    rightView: {
        flex: 2,
        padding: 10,
    },
    currentText: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    currentTemp: {
        fontSize: 36,
    },
    currentTempContainer: {
        borderRadius: BORDER_HEIGHT / 2,
        height: BORDER_HEIGHT,
        width: BORDER_HEIGHT,
        borderWidth: 2,
        borderColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightItem: {
        fontSize: 24,
        color: Colors.black,
    },
    rightItemContainer: {
        marginBottom: 5,
    },
    imageStyle: {
        fontSize: 40,
        color: Colors.blue,
    },
})
