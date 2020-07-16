import React,{ Component } from "react";
import { View } from "react-native";
import { getToken } from "../../service/storage";

export default class Redirect extends Component{

    componentDidMount(){
        const {navigation} = this.props; 

        getToken().then( token => {
            if(token == undefined || token === null || token === ''){
                navigation.navigate('Login')
            }
            else{ navigation.navigate('Evenement') }
        })
    }
    render = () =>{
        return <View></View>
    }
}