// @flow
import React, { Component } from 'react'
import { View, StyleSheet, LayoutAnimation } from 'react-native'
import { Row, StyledText, PwsCard } from '.'
import { Colors, Icons } from '../../resources'
import Icon from 'react-native-vector-icons/Feather'

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

type State = {
    expanded: boolean,
}

const BORDER_HEIGHT = 150

export class SolarCard extends Component<Props, State> {
    state = {
        expanded: true,
    }

    _toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
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
        const { innerContainer } = styles
        const { expanded } = this.state
        return (
            <PwsCard
                title={'Sun'}
                icon={this._renderIcon()}
                handlePress={this._toggle}>
                {expanded && (
                    <View style={innerContainer}>
                        {this._renderUvRow()}
                        {this._renderSolarRadiation()}
                    </View>
                )}
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
