// @flow
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native'
import { Row, StyledText, PwsCard, TemperatureGraph } from '.'
import { Colors, Icons } from '../../resources'
import Icon from 'react-native-vector-icons/FontAwesome'

type Props = {
    tempData: TempData,
    device: Array<*>,
}

type TempData = {
    tempf: number,
    humidity: number,
    dewPoint: number,
    feelsLike: number,
}

type State = {
    expanded: boolean,
    front: boolean,
}

const DEGREE = '°'
const PERCENT = '%'
export class TemperatureCard extends Component<Props, State> {
    state = {
        expanded: true,
        front: true,
    }

    _animate = () =>
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    _toggle = () => {
        this._animate()
        this.setState(prev => ({ expanded: !prev.expanded }))
    }

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

    _flip = () => {
        this._animate()
        this.setState(prev => ({ front: !prev.front }))
    }

    _renderContent = () => {
        const { cardContainer, row } = styles
        const { front } = this.state
        const { device } = this.props
        return (
            <View>
                {front ? (
                    <Row style={row}>
                        <View style={cardContainer}>
                            {this._renderCurrentTemp()}
                        </View>
                        {this._renderRight()}
                    </Row>
                ) : (
                    <TemperatureGraph lastDay={device} />
                )}
                <TouchableOpacity
                    onPress={this._flip}
                    style={{
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Colors.blue,
                    }}>
                    <StyledText style={{ color: Colors.white }}>
                        {'Flip'}
                    </StyledText>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { expanded } = this.state
        return (
            <PwsCard
                title={'Temperature'}
                icon={this._renderIcon()}
                handlePress={this._toggle}
                initial>
                {expanded && this._renderContent()}
            </PwsCard>
        )
    }
}
const BORDER_HEIGHT = 120
const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
