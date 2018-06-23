// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { StyledText, Row, FlipButton, PwsCard, WindGraph } from '.'
import { Colors, Images, Icons } from '../../resources'
import Icon from 'react-native-vector-icons/Feather'
import type { Device, CurrentWindData } from '../../types'
import { simpleAnimate } from '../../utils'

type Props = {
    windData: CurrentWindData,
    device: Device,
}

type State = {
    expanded: boolean,
    front: boolean,
}

const IMAGE_SIZE = 130
export class WindCard extends Component<Props, State> {
    state = {
        expanded: true,
        front: true,
    }

    _flip = () => {
        simpleAnimate()
        this.setState(prev => ({ front: !prev.front }))
    }

    _toggle = () => {
        simpleAnimate()
        this.setState(prev => ({ expanded: !prev.expanded }))
    }

    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.wind} style={imageStyle} />
    }

    _renderText = (text: string, textStyle: mixed) => {
        return <StyledText style={textStyle}>{text}</StyledText>
    }

    _renderLeft = ({ windData }) => {
        const { winddir } = windData
        const { sideContainer, leftContainer, windDirText } = styles
        const displayWindDir = calcWindDirectionText(winddir)
        return (
            <View style={[sideContainer, leftContainer]}>
                <StyledText>{'From'}</StyledText>
                <StyledText
                    style={windDirText}>{`${displayWindDir}`}</StyledText>
            </View>
        )
    }

    _renderCompassText = (winddir: number, windspeedmph: number) => {
        const { compassText, windText, windTextBig } = styles
        const textTransform = { transform: [{ rotate: `${-1 * winddir}deg` }] }
        const bigText = [windText, windTextBig]
        return (
            <View style={[compassText, textTransform]}>
                {this._renderText(`${windspeedmph.toFixed(1)}`, bigText)}
                {this._renderText('mph', [windText])}
            </View>
        )
    }

    _renderCenter = ({ windData }) => {
        const { imageContainer, image, centerContainer } = styles
        const { windspeedmph, winddir } = windData
        const transform = { transform: [{ rotate: `${winddir}deg` }] }
        return (
            <View style={centerContainer}>
                <View style={imageContainer}>
                    <ImageBackground
                        source={Images.windCompass}
                        style={[image, transform]}>
                        {this._renderCompassText(winddir, windspeedmph)}
                    </ImageBackground>
                </View>
            </View>
        )
    }

    _renderRight = ({ windData }) => {
        const { windgustmph } = windData
        const { sideContainer, rightContainer, windDirText } = styles
        return (
            <View style={[sideContainer, rightContainer]}>
                <StyledText>{'Gusts'}</StyledText>
                <StyledText style={windDirText}>{`${windgustmph.toFixed(
                    1,
                )}`}</StyledText>
            </View>
        )
    }

    render() {
        const { device } = this.props
        const { innerContainer } = styles
        const { front } = this.state
        return (
            <PwsCard
                icon={this._renderIcon()}
                title={'Wind'}
                handlePress={this._toggle}>
                {front ? (
                    <Row style={innerContainer}>
                        {this._renderLeft(this.props)}
                        {this._renderCenter(this.props)}
                        {this._renderRight(this.props)}
                    </Row>
                ) : (
                    <WindGraph lastDay={device} />
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
    innerContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 3,
        padding: 20,
    },
    imageContainer: {
        height: IMAGE_SIZE + 5,
        width: IMAGE_SIZE,
    },
    windTextBig: {
        fontSize: 36,
    },
    windText: {
        textAlign: 'center',
        fontSize: 18,
    },
    sideContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        height: IMAGE_SIZE + 40,
    },
    leftContainer: {
        alignItems: 'flex-start',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    windDirText: {
        color: Colors.blue,
        fontSize: 28,
    },
    textContainer: {
        justifyContent: 'center',
    },
    compassText: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const RANGE = 360 / 16

const calcWindDirectionText = (windDir: number) => {
    const DIRECTIONS = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ]
    const val = parseInt(windDir / RANGE + 0.5)
    return DIRECTIONS[val % 16]
}
