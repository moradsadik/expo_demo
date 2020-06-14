import React, {Component} from "react";
import {AsyncStorage, Text, TextInput, View} from "react-native";
import {Avatar, Button} from "react-native-elements";
import {TouchableNativeFeedback} from "react-native-gesture-handler";

export default class Login extends Component{

    constructor(){
        super()
        this.state = {
            username : '',
            password : '',
            error : null
        }
    }

    componentDidMount() {
       // let token = await AsyncStorage.getItem("token");
        /*if(token && token === true) {
            this.props.navigation.navigate('Evenement')
        }*/
    }

    login  = () => {
        const {navigation} = this.props;
        let {username, password} = this.state;

        if(!username || !password){
            this.setState({error : 'Les champs doit etre remplit 🙏'})
            return;
        }

        if(username === 'admin' && password ==='admin'){
            navigation.navigate('Evenement');
        } else {
            this.setState({error: '😡 verifier login ou password'})
        }
    }

    render(){
        const {navigation} = this.props;

        return <View style={{flex:1, flexDirection:'column',justifyContent:'center',marginHorizontal:20}}>

            <View style={{marginBottom:30, alignItems: 'center'}}>
                <Avatar rounded size="xlarge"
                        containerStyle={{}}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} />
            </View>

            <TextInput
                placeholder = 'username'
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
                this.state.error &&  <View style={{marginTop:10}}>
                    <Text style={{color : '#f00', fontSize: 15, textAlign:"justify"}}> {this.state.error}</Text>
                </View>
            }


        </View>
    }
}
