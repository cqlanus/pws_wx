// @flow
import React, { Component } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { Card, StyledText, CardHeader, Row } from '.'
import { Colors, Images, Icons } from '../../resources'
import SvgUri from 'react-native-svg-uri'
import Icon from 'react-native-vector-icons/Feather'

type Props = {
    windData: WindData,
}

type WindData = {
    winddir: number,
    windspeedmph: number,
    windgustmph: number,
    maxdailygust: number,
}
const IMAGE_SIZE = 130
export class WindCard extends Component<Props> {
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
        const { container, card, innerContainer } = styles
        return (
            <View style={container}>
                <Card style={card}>
                    <CardHeader title={'Wind'} image={this._renderIcon()} />
                    <Row style={innerContainer}>
                        {this._renderLeft(this.props)}
                        {this._renderCenter(this.props)}
                        {this._renderRight(this.props)}
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
        // flexDirection: 'column-reverse',
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
