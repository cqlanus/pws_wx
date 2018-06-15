// @flow
import React, { Component } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { Card, StyledText, CardHeader } from '.'
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
const IMAGE_SIZE = 140
export class WindCard extends Component<Props> {
    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.wind} style={imageStyle} />
    }
    render() {
        const {
            container,
            card,
            innerContainer,
            imageContainer,
            image,
            windText,
        } = styles
        const { windspeedmph, winddir } = this.props.windData
        const transform = { transform: [{ rotate: `${winddir}deg` }] }
        const textTransform = { transform: [{ rotate: `${-1 * winddir}deg` }] }
        return (
            <View style={container}>
                <Card style={card}>
                    <CardHeader title={'Wind'} image={this._renderIcon()} />
                    <View style={innerContainer}>
                        <View style={imageContainer}>
                            <ImageBackground
                                source={Images.windCompass}
                                style={[image, transform]}>
                                <StyledText style={[windText, textTransform]}>
                                    {windspeedmph}
                                </StyledText>
                            </ImageBackground>
                        </View>
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
    imageContainer: {
        height: IMAGE_SIZE,
        width: IMAGE_SIZE,
    },
    windText: {
        fontSize: 36,
        textAlign: 'center',
    },
})
