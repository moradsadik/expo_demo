import {createStackNavigator} from "react-navigation-stack";
import Login from "../component/authentifications/Login";
import {Icon} from "react-native-elements";
import Inscription from "../component/authentifications/Inscription";
import React from "react";

const authenticationStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
            drawerLabel: 'Login',
            drawerIcon: ({tintColor}) => (
                <Icon name='user' type="font-awesome" color={tintColor}/>
            )
        }
    },
    Inscription: {
        screen: Inscription,
        navigationOptions: {
            headerShown: false,
            drawerLabel: 'Inscription',
            drawerIcon: ({tintColor}) => (
                <Icon name='user' type="font-awesome" color={tintColor}/>
            )
        }
    }
})


export default authenticationStack;