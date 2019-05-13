//ip address: 76.218.49.128
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from './src/screens/LoginScreen';
import Battle from './src/screens/BattleScreen';
import TeamSelection from './src/screens/TeamSelectionScreen';

import { Provider } from 'react-redux';
import { compose } from redux;
import reducers from './src/reducers'

import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ host: "76.218.49.128" })
    .useReactNative()
    use(reactotronRedux())
    .connect();

const store = Reactotron.createStore(reducers, {}, compose());

// const store = createStore(reducers); 

console.ignoredYellowBox = ["Setting a timer"];

const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        TeamSelect: TeamSelectionScreen,
        Battle: BattleScreen
    },
    {
        initialRouteName: "Login"
    }
);

class Router extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        )
    }
}