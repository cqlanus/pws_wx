// @flow
import React from 'react'
import { Scene } from 'react-native-router-flux'
import {
    TabIdentifiers,
    ScreenIdentifiers,
    IntroScreen,
    PWSContainer,
    NWSContainer,
} from '../../screens'
import { Images } from '../../resources'
import { TabIcon } from '../widgets'

export const TabScene = {
    PWS: (
        <Scene
            title={'PWS'}
            icon={TabIcon}
            image={Images.icon1}
            hideNavBar
            key={TabIdentifiers.PWS}>
            <Scene
                initial
                component={PWSContainer}
                key={ScreenIdentifiers.PWS}
            />
        </Scene>
    ),
    Forecast: (
        <Scene
            title={'Forecast'}
            image={Images.icon2}
            icon={TabIcon}
            hideNavBar
            key={TabIdentifiers.Forecast}>
            <Scene
                initial
                component={NWSContainer}
                key={ScreenIdentifiers.NWS}
            />
        </Scene>
    ),
    Radar: (
        <Scene
            title={'Radar'}
            icon={TabIcon}
            image={Images.icon3}
            hideNavBar
            key={TabIdentifiers.Radar}>
            <Scene
                initial
                component={IntroScreen}
                key={ScreenIdentifiers.Intro3}
            />
        </Scene>
    ),
}
