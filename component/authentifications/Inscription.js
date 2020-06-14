import React, {Component} from "react";
import {Text, TextInput, View} from "react-native";
import {Avatar, Button} from "react-native-elements";
import {TouchableNativeFeedback} from "react-native-gesture-handler";

export default class Inscription extends Component{

    constructor(){super()}

    render(){
        const {navigation} = this.props;

        return <View style={{flex:1, flexDirection:'column',justifyContent:'center',marginHorizontal:20}}>

            <View style={{marginBottom:30, alignItems: 'center'}}>
                <Avatar rounded size="xlarge"
                        containerStyle={{}}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} />
            </View>

            <TextInput
                placeholder = 'username' placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80'}}
            />

            <TextInput
                placeholder = 'password' placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />

            <TextInput
                placeholder = 'email' placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />

            <TextInput
                placeholder = 'phone number' placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />

            <Button
                title="Inscription"
                onPress = { () => navigation.navigate('Application') }
                buttonStyle = {{backgroundColor: '#4281a4'}}
                containerStyle = {{marginBottom : 15}}
            />

            <View style={{flexDirection:'column-reverse'}}>
                <TouchableNativeFeedback onPress = {() => {navigation.navigate('Login')}}>
                    <Text style={{color : '#4281a4', textAlign:'right'}}>Go to login page</Text>
                </TouchableNativeFeedback>
            </View>

        </View>
    }
}

