import React, {Component} from "react";
import {Text, TextInput, View, ActivityIndicator} from "react-native";
import {Button, Icon} from "react-native-elements";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import { setToken, set } from "../../service/storage";
import {http,LOGIN} from '../../service/axios'

const SUCCESS = '#2b9348';
const ERROR = '#f00';

export default class Login extends Component{

    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            icon : 'user',
            message : {color:null, data:null},
            loading : false
        }
    }

    componentDidMount() {
    }

    login  = () => {
        const {navigation} = this.props;
        let {email, password, icon} = this.state;

        this.setState({loading : true})

        if(!email || !password){
            this.setState({loading:false, message : {color:ERROR, data : 'Les champs doit etre remplit 🙏'}})
            return;
        }
        http.post(LOGIN, {email, password})
        .then(response => {
            let token = response.data.token;
            setToken(token)
            let message = {color : SUCCESS, data : `👍 successful login 😊.`}
            this.setState({message, loading : false})
            set("email",  email)
            navigation.navigate('Evenement');

        })
        .catch(e => {
            let message = {color : ERROR, data : `😡 login ou password incorrect` }
            this.setState({message, loading:false})
        })
    }

    render(){
        const {navigation} = this.props;
        let {message,icon, loading} = this.state

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        return <View style={{flex:1, flexDirection:'column',justifyContent:'center',marginHorizontal:20}}>

            <View style={{marginBottom:30, alignItems: 'center'}}>
                <Icon containerStyle={{borderRadius:100, borderWidth:3, borderColor:'#4281a4', padding:15}} 
                      iconStyle={{fontSize:100}} color="#4281a4" name={icon} type='feather' />
            </View>

            <TextInput
                placeholder = 'email'
                placeholderTextColor = "#463f3a"
                id = "username"
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80'}}
            />

            <TextInput
                placeholder = 'password'
                placeholderTextColor = "#463f3a"
                id = "password"
                value={this.state.password}
                onChangeText={ password=> this.setState({password})}
                style={{ height: 'auto', borderWidth:0,borderBottomWidth:1, borderBottomColor:'#463f3a',
                    paddingVertical:10, paddingHorizontal:10, marginBottom:20 , color:'#3d5a80' }}
            />

            <Button
                title="Connexion"
                onPress = { this.login }
                buttonStyle = {{backgroundColor: '#4281a4'}}
                containerStyle = {{marginBottom : 15}}
            />

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableNativeFeedback onPress={ () => navigation.navigate('Inscription')} >
                    <Text style={{color : '#4281a4', textAlign:'left'}}>cree un compte</Text>
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
