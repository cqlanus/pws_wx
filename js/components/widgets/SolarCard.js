// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Row, StyledText, Card, CardHeader } from '.'
import { Images, Colors, Icons } from '../../resources'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
    solarData: any,
}

const UV_INDECES = [
    {
        uvNums: [0, 1, 2],
        risk: 'Low',
    },
    {
        uvNums: [3, 4, 5],
        risk: 'Med.',
    },
    {
        uvNums: [6, 7],
        risk: 'High',
    },
    {
        uvNums: [8, 9, 10],
        risk: 'V. High',
    },
    {
        uvNums: [11],
        risk: 'Exc.',
    },
]

const BORDER_HEIGHT = 150

export class SolarCard extends Component<Props> {
    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.rain} style={imageStyle} />
    }

    _renderUvItems = (items: Array<number>) => {
        const { uvText, currentUv } = styles
        const { uv } = this.props.solarData
        return (
            <Row>
                {items.map(item => {
                    const isSame = uv === item
                    return (
                        <StyledText
                            style={[uvText, isSame && currentUv]}
                            key={item}>
                            {item}
                        </StyledText>
                    )
                })}
            </Row>
        )
    }

    _renderUvRow = () => {
        const { uvRowContainer, uvRow, solarSubtitle } = styles
        const { uv } = this.props.solarData
        return (
            <View style={{ alignItems: 'center' }}>
                <StyledText style={solarSubtitle}>{'UV Index'}</StyledText>
                <Row style={uvRowContainer}>
                    {UV_INDECES.map((obj, idx) => {
                        const { risk, uvNums } = obj
                        return (
                            <View key={idx} style={uvRow}>
                                {this._renderUvItems(uvNums)}
                                <StyledText>{risk}</StyledText>
                            </View>
                        )
                    })}
                </Row>
            </View>
        )
    }

    _renderSolarRadiation = () => {
        const { solarContainer, solarText, solarSubtitle } = styles
        const { solarradiation } = this.props.solarData
        return (
            <View
                style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
                <StyledText style={solarSubtitle}>
                    {'Solar Radiation'}
                </StyledText>
                <View style={solarContainer}>
                    <StyledText style={solarText}>
                        {`${solarradiation.toFixed(1)}`}
                    </StyledText>
                    <StyledText>{'W/m^2'}</StyledText>
                </View>
            </View>
        )
    }

    render() {
        const { container, card, innerContainer } = styles
        return (
            <View style={container}>
                <Card style={card}>
                    <CardHeader title={'Sun'} image={this._renderIcon()} />
                    <View style={innerContainer}>
                        {this._renderUvRow()}
                        {this._renderSolarRadiation()}
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
    uvRowContainer: {
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    uvRow: {
        alignItems: 'center',
    },
    uvText: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        fontSize: 20,
        marginBottom: 5,
    },
    currentUv: {
        borderColor: Colors.blue,
        borderWidth: 2,
        borderRadius: 5,
    },
    innerContainer: {
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
    },
    solarContainer: {
        borderRadius: BORDER_HEIGHT / 2,
        height: BORDER_HEIGHT,
        width: BORDER_HEIGHT,
        borderWidth: 2,
        borderColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    solarText: {
        fontSize: 36,
    },
    solarSubtitle: {
        fontSize: 18,
        color: Colors.blue,
    },
})
