import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './js/store'

import { IntroScreen } from './js/containers'

const store = configureStore()

export const App = props => {
    return (
        <Provider store={store}>
            <IntroScreen />
        </Provider>
    )
}
