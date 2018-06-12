// @flow

import { AppRegistry, StatusBar, YellowBox } from 'react-native'
import { App } from './App'
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
])
// StatusBar.setBackgroundColor("#f74902", false);

AppRegistry.registerComponent('WeatherApp', () => App)
