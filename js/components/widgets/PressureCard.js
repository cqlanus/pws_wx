// @flow
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    Switch,
    LayoutAnimation,
} from 'react-native'
import { StyledText, Row, PwsCard, FlipButton, PressureGraph } from '.'
import { Colors, Icons, Images } from '../../resources'
import Icon from 'react-native-vector-icons/Entypo'
import { simpleAnimate } from '../../utils'
import type { Device } from '../../types'

type Props = {
    pressureData: any,
    device: Device,
}

type State = {
    inches: boolean,
    expanded: boolean,
    front: boolean,
}

const IMAGE_SIZE = 130
export class PressureCard extends Component<Props, State> {
    state = {
        inches: true,
        expanded: true,
        front: true,
    }

    _flip = () => {
        simpleAnimate()
        this.setState(prev => ({ front: !prev.front }))
    }

    _toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState(prev => ({ expanded: !prev.expanded }))
    }

    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.gauge} style={imageStyle} />
    }

    _renderText = (text: string, textStyle: mixed) => {
        return <StyledText style={textStyle}>{text}</StyledText>
    }

    _renderBottom = ({ pressureData }) => {
        const { pressureTxt } = styles
        const { baromrelin, baromabsin } = pressureData
        const { inches } = this.state
        const pressure = inches ? baromrelin : convertToMb(baromrelin)
        const text = inches ? 'inHg' : 'mb'

        return (
            <View
                style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: IMAGE_SIZE + 40,
                }}>
                <Switch
                    onTintColor={Colors.blue}
                    onValueChange={this._toggleUnits}
                    value={!inches}
                />
                <Row style={{ alignItems: 'flex-end', paddingVertical: 10 }}>
                    {this._renderText(`${pressure.toFixed(2)}`, pressureTxt)}
                    {this._renderText(text, { fontSize: 18 })}
                </Row>
            </View>
        )
    }

    _renderCenter = ({ pressureData }) => {
        const {
            imageContainer,
            image,
            centerContainer,
            pressureGauge,
            pressureGaugeContainer,
        } = styles
        const { baromrelin } = pressureData
        const { inches } = this.state
        const gauge = inches ? Images.pressureGauge : Images.pressureGauge_mm
        const angle = calcPressureAngle(baromrelin)
        const transform = { transform: [{ rotate: `${angle}deg` }] }
        return (
            <View style={centerContainer}>
                <View style={imageContainer}>
                    <ImageBackground source={gauge} style={[image]}>
                        <View style={pressureGaugeContainer}>
                            <Image
                                source={Images.pressureGaugePointer}
                                style={[pressureGauge, transform]}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </View>
        )
    }

    _toggleUnits = () => this.setState(prev => ({ inches: !prev.inches }))

    render() {
        const { device } = this.props
        const { centerContainer } = styles
        const { front } = this.state
        return (
            <PwsCard
                title={'Pressure'}
                icon={this._renderIcon()}
                handlePress={this._toggle}>
                {front ? (
                    <Row style={centerContainer}>
                        {this._renderBottom(this.props)}
                        {this._renderCenter(this.props)}
                    </Row>
                ) : (
                    <PressureGraph lastDay={device} />
                )}
                <FlipButton onPress={this._flip} />
            </PwsCard>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        fontSize: 40,
        color: Colors.blue,
    },
    centerContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    imageContainer: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE * 1.2,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressureTxt: {
        color: Colors.blue,
        fontSize: 28,
    },
    pressureGauge: {
        width: null,
        height: null,
        flex: 1,
    },
    pressureGaugeContainer: {
        width: 100,
        height: 100,
    },
})

const convertToMb = (pressure: number) => pressure * 33.8639
const calcPressureAngle = (pressure: number) => {
    const START_PRESSURE = 30
    const ONE_INCH_HG = 66.7
    const angle = (pressure - START_PRESSURE) * ONE_INCH_HG
    return angle
}
