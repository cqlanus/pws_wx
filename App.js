import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import {
    Router,
    Lightbox,
    Tabs,
    Modal,
    Reducer,
} from 'react-native-router-flux'
import { configureStore } from './js/store'
import { RootIdentifiers } from './js/screens'
import { TabScene } from './js/components/scenes/Tabs'
import { Colors } from './js/resources'

const RouterWithRedux = connect()(Router)
const store = configureStore()

export class App extends Component {
    _reducerCreate = params => {
        const defaultReducer = new Reducer(params)
        return (state, action) => {
            return defaultReducer(state, action)
        }
    }
    render() {
        const { PWS, Forecast, Radar } = TabScene

        return (
            <Provider store={store}>
                <RouterWithRedux createReducer={this._reducerCreate}>
                    <Lightbox>
                        <Modal key={RootIdentifiers.Root}>
                            <Tabs
                                key={RootIdentifiers.Tabs}
                                backTitle={'Back'}
                                tabBarPosition="bottom"
                                activeTintColor={Colors.blue}
                                inactiveTintColor={Colors.grey}
                                hideNavBar>
                                {PWS}
                                {Forecast}
                                {Radar}
                            </Tabs>
                        </Modal>
                    </Lightbox>
                </RouterWithRedux>
            </Provider>
        )
    }
}
