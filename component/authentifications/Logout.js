import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";

const TOKEN = "token";
export default class Logout extends Component{

    constructor(){super()}

    async componentDidMount() {
        const {navigation} = this.props;

        await AsyncStorage.removeItem(TOKEN);
        navigation.navigate('Redirection')

    }

    render = () => {
        return <View></View>
    }
}
