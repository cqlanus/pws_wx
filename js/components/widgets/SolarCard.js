// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Row, StyledText, PwsCard, FlipButton, SolarGraph } from '.'
import { Colors, Icons } from '../../resources'
import Icon from 'react-native-vector-icons/Feather'
import { simpleAnimate } from '../../utils'
import type { Device, CurrentSolarData } from '../../types'
import { UV_INDECES } from '../../data'

type Props = {
    solarData: CurrentSolarData,
    device: Device,
}

type State = {
    expanded: boolean,
    front: boolean,
}

const BORDER_HEIGHT = 150

export class SolarCard extends Component<Props, State> {
    state = {
        expanded: true,
        front: true,
    }

    _flip = () => {
        simpleAnimate()
        this.setState(prev => ({ front: !prev.front }))
    }

    _toggle = () => {
        simpleAnimate
        this.setState(prev => ({ expanded: !prev.expanded }))
    }

    _renderIcon = () => {
        const { imageStyle } = styles
        return <Icon name={Icons.sun} style={imageStyle} />
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
        const {
            uvRowContainer,
            uvRow,
            solarSubtitle,
            uvContainerContainer,
        } = styles
        const { uv } = this.props.solarData
        return (
            <View style={uvContainerContainer}>
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
        const {
            solarContainer,
            solarText,
            solarSubtitle,
            solarContainerContainer,
        } = styles
        const { solarradiation } = this.props.solarData
        return (
            <View style={solarContainerContainer}>
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
        const { device } = this.props
        const { innerContainer } = styles
        const { front } = this.state
        return (
            <PwsCard
                title={'Sun'}
                icon={this._renderIcon()}
                handlePress={this._toggle}>
                {front ? (
                    <View style={innerContainer}>
                        {this._renderUvRow()}
                        {this._renderSolarRadiation()}
                    </View>
                ) : (
                    <SolarGraph lastDay={device} />
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
    solarContainerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
    uvContainerContainer: {
        alignItems: 'center',
    },
})
