import React, { Component } from "react";
import {View, Text,ActivityIndicator, Dimensions} from "react-native";
import axios from "axios";
import moment from "moment";
import { Avatar, Icon, Button } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import {http,ARTISTSID,RENCONTRE, AVATAR} from '../../service/axios'
import { getToken } from "../../service/storage";
import { alert } from "../../service/utils";

const SUCCESS = '#2b9348';
const ERROR = '#f00';

export default class ArtistDetaille extends Component{

    constructor(){
        super();
        this.state = {
            artist : {},
            token : null,
            loading: true,
            planifiaction : null,
            message : {color:null, data:null},
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        let id = navigation.getParam('id');
        http.get(ARTISTSID + id)
            .then(response => {
                let artist = response.data;
                this.setState({ artist, loading : false })
            })
            .catch(error => { console.log(error) })


        getToken().then( token => {
            if(token){
                this.setState({token})
            }
        })
    }

    planifier = () => {
        const { token, artist } = this.state;
        if(token){
            console.log(token)
        }
        this.setState({ loading : true, planifiaction : 'Votre demande est en cours ...' })
        axios.post(
            RENCONTRE, 
            {artist : `/api/artists/${artist.id}`}, 
            {
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                }
            }
        ).then(response => {
            console.log('success')
            alert('Success',`👍 Demande enregistré en attente de validation 😊.`);
            this.setState({planifiaction : null,message : null, loading : false})
        
        }).catch(error => { 
            alert('Error',`un probleme servenue lors enregistrement demande 🙏`);
            this.setState({loading:false,planifiaction : null, message : null})
        })
    }
    render = () =>{

        let {planifiaction, artist, loading, message} = this.state;
        const { navigation } = this.props;

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                {planifiaction && <Text style={{marginBottom : 10, color : '#52796f'}}>{planifiaction}</Text>}
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
                {
                    message &&  <View style={{marginTop:10}}>
                        <Text style={{color : message.color, fontSize: 15, textAlign:"justify"}}> {message.data}</Text>
                    </View>
                }
                <Button onPress = {this.planifier} title="Planifier une rencontre" />
            </View>
        </View>
    }
}