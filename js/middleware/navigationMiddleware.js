import { Actions } from 'react-native-router-flux'

export const navigationMiddleware = store => next => action => {
    if (action.reset) {
        Actions.reset(action.routePath, action.routeProps)
    } else if (action.replace) {
        Actions.replace(action.routePath, action.routeProps)
    } else if (action.popTo) {
        Actions.popTo(action.routePath, action.routeProps)
    } else if (action.pop) {
        Actions.pop()
    } else if (action.routePath) {
        Actions.push(action.routePath, action.routeProps)
    }
    return next(action)
}
