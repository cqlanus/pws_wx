// @flow
import React from 'react'
import { Scene } from 'react-native-router-flux'
import { TabIdentifiers, ScreenIdentifiers, IntroScreen } from '../../screens'
import { Images } from '../../resources'

export const TabScene = {
    PWS: (
        <Scene title={'PWS'} image={Images.icon1} key={TabIdentifiers.PWS}>
            <Scene
                initial
                component={IntroScreen}
                key={ScreenIdentifiers.Intro}
            />
        </Scene>
    ),
    Forecast: (
        <Scene
            title={'Forecast'}
            image={Images.icon2}
            key={TabIdentifiers.Forecast}>
            <Scene
                initial
                component={IntroScreen}
                key={ScreenIdentifiers.Intro2}
            />
        </Scene>
    ),
    Radar: (
        <Scene title={'Radar'} image={Images.icon3} key={TabIdentifiers.Radar}>
            <Scene
                initial
                component={IntroScreen}
                key={ScreenIdentifiers.Intro3}
            />
        </Scene>
    ),
}
