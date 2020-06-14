import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";

export default class Logout extends Component{

    constructor(){super()}
    async componentDidMount() {
        let token = await AsyncStorage.getItem("token");
    }

    render(){
        const {navigation} = this.props;

        return <View>    </View>
    }
}
