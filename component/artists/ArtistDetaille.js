import React, { Component } from "react";
import {View, Text,ActivityIndicator, Dimensions} from "react-native";
import axios from "axios";
import moment from "moment";
import { Avatar, Icon, Button } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native-gesture-handler";


const API = 'https://event.sadiksoumia.com/api/';
const ARTISTS = `${API}artists/`;
const AVATAR = 'https://event.sadiksoumia.com/uploads/images/artists/';


const http = axios.create({
    headers: {'Accept': 'application/json'}
});

export default class ArtistDetaille extends Component{

    constructor(){
        super();
        this.state = {
            artist : {},
            loading: true
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        let id = navigation.getParam('id');
        http.get(ARTISTS + id)
            .then(response => {
                let artist = response.data;
                this.setState({ artist, loading : false })
            })
            .catch(error => { console.log(error) })
    }

    render = () =>{

        let {artist, loading} = this.state;
        const { navigation } = this.props;

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        return <View style={{flex:1, flexDirection:'column'}}>

            <View style={{marginTop:10,marginBottom:10, alignItems: 'center'}}>
                <Avatar rounded size="xlarge"
                        containerStyle={{}}
                        source={{ uri: AVATAR+(artist.avatar) }} />
            </View>
            <View style={{ paddingHorizontal: 10, alignItems: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#283d3b', textAlign: 'justify', marginBottom: 5 }}>{artist.name} {artist.prenom}</Text>
            </View>
            <Text style={{paddingHorizontal: 10, fontSize:20, color: '#264653', marginVertical : 10}}>Participations de l'artiste : </Text>
            <View style={{ paddingHorizontal: 15}}>
                {
                    artist.events.map((event, index) => {
                        return <View key={index}  style ={{marginBottom: 10}}>
                            <TouchableNativeFeedback onPress = {() => navigation.navigate('EventDetaille', { id: event.id, title: event.titre }) }>
                                <Text style={{ fontSize: 20}}>{event.titre}</Text>
                                <View style= {{flexDirection : 'row',marginVertical:5}}> 
                                    <Icon color='#247ba0' name='clock-o' type='font-awesome' />
                                    <Text style={{ fontSize: 18, marginLeft: 20 }}>
                                    {moment(Date.parse(event.dateDebut)).format("DD MMM")} - {moment(Date.parse(event.dateDebut)).format("h:mm:ss")} à {moment(Date.parse(event.dateFin)).format("h:mm:ss")}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    })
                }
            </View>
            <View style={{position:'absolute', bottom:10, left:5, width : Dimensions.get('window').width-10, height:'auto', paddingHorizontal: 10, marginTop: 20}}>
                <Button title="Planifier une rencontre" />
            </View>
        </View>
    }
}