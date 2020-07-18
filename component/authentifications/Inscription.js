import React, {Component} from "react";
import {Text, TextInput, View, ActivityIndicator} from "react-native";
import {Icon, Button} from "react-native-elements";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import {http,USERS} from '../../service/axios'
import { set } from "../../service/storage";
const SUCCESS = '#2b9348';
const ERROR = '#f00';

export default class Inscription extends Component{

    constructor(props){
        super(props)
        this.state = {
            email : null,
            password : null,
            confirmPassword : null,
            username: null,
            message : {color:null, data:null},
            loading : false
        }
    }

    inscription = () => {
        console.log("inscription .....")
        const {navigation} = this.props;
        let {email, password, confirmPassword, username} = this.state;

        this.setState({loading : true})

        if(!email || !password || !username || !confirmPassword){
            this.setState({loading:false, message : {color:ERROR, data : 'Les champs doit etre remplit 🙏'}})
            return;
        }
        http.post(USERS, {email, password, confirmPassword, username})
        .then(response => {
            let message = {color : SUCCESS, data : `👍 successful inscription 😊.`}
            this.setState({message, loading : false})
            set("email", email)
            navigation.navigate('Login');
        })
        .catch(e => {
            let message = {color : ERROR, data : `😡 formulaire doit etre remplie correctement` }
            this.setState({message, loading:false})
        })
    }

    render(){
        const {navigation} = this.props;
        let {message, loading} = this.state

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return <View style={{flex:1, flexDirection:'column',justifyContent:'center',marginHorizontal:20}}>

            <View style={{marginBottom:30, alignItems: 'center'}}>
                <Icon containerStyle={{borderRadius:100, borderWidth:3, borderColor:'#4281a4', padding:20}} 
                      iconStyle={{fontSize:100}} color="#4281a4" name="user-plus" type='feather' />
            </View>

            <TextInput
                placeholder = 'username'
                value={this.state.username}
                onChangeText={username => this.setState({username})} 
                placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80'}}
            />

            <TextInput
                placeholder = 'password'
                value={this.state.password}
                onChangeText={password => this.setState({password})}  
                placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />
            
            <TextInput
                placeholder = 'confirm password' 
                value={this.state.email}
                onChangeText={confirmPassword => this.setState({confirmPassword})}  
                placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />

            <TextInput
                placeholder = 'email'  
                value={this.state.email}
                onChangeText={email => this.setState({email})}  
                placeholderTextColor = "#463f3a"
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />

            <Button
                title="Inscription"
                onPress = { this.inscription }
                buttonStyle = {{backgroundColor: '#4281a4'}}
                containerStyle = {{marginBottom : 15}}
            />

            <View style={{flexDirection:'column-reverse'}}>
                <TouchableNativeFeedback onPress = {() => {navigation.navigate('Login')}}>
                    <Text style={{color : '#4281a4', textAlign:'right'}}>Go to login page</Text>
                </TouchableNativeFeedback>
            </View>

            {
                message &&  <View style={{marginTop:10}}>
                    <Text style={{color : message.color, fontSize: 15, textAlign:"justify"}}> {message.data}</Text>
                </View>
            }

        </View>
    }
}

