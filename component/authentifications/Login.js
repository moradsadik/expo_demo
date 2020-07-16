import React, {Component} from "react";
import {Text, TextInput, View, ActivityIndicator} from "react-native";
import {Avatar, Button} from "react-native-elements";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import axios from "axios";
import { setToken } from "../../service/storage";

const SUCCESS = '#2b9348';
const ERROR = '#f00';
const LOGIN = 'https://event.sadiksoumia.com/api/login';

export default class Login extends Component{

    constructor(){
        super()
        this.state = {
            username : '',
            password : '',
            message : {color:null, data:null},
            loading : false
        }
    }

    componentDidMount() {
    }

    login  = () => {
        const {navigation} = this.props;
        let {username, password} = this.state;

        this.setState({loading : true})

        if(!username || !password){
            this.setState({loading:false,message : {color:ERROR, data : 'Les champs doit etre remplit 🙏'}})
            return;
        }

        axios.post(LOGIN, {email: username, password})
        .then(response => {
            let token = response.data.token;
            setToken(token)
            let message = {color : SUCCESS, data : `👍 successful login 😊.`}
            this.setState({message, loading : false})
            navigation.navigate('Evenement');
        })
        .catch(e => {
            let error = e.response.data.code + " : " + e.response.data.message;
            let message = {color : ERROR, data : `😡 login ou password incorrect` }
            this.setState({message, loading:false})
        })
    }

    render(){
        const {navigation} = this.props;

        if(this.state.loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        return <View style={{flex:1, flexDirection:'column',justifyContent:'center',marginHorizontal:20}}>

            <View style={{marginBottom:30, alignItems: 'center'}}>
                <Avatar rounded size="xlarge"
                        containerStyle={{}}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} />
            </View>

            <TextInput
                placeholder = 'email'
                placeholderTextColor = "#463f3a"
                id = "username"
                value={this.state.username}
                onChangeText={username => this.setState({username})}
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
                <TouchableNativeFeedback>
                    <Text style={{color : '#4281a4', textAlign:'right'}}>forgot password ?</Text>
                </TouchableNativeFeedback>
            </View>

            {
                this.state.message &&  <View style={{marginTop:10}}>
                    <Text style={{color : this.state.message.color, fontSize: 15, textAlign:"justify"}}> {this.state.message.data}</Text>
                </View>
            }


        </View>
    }
}
