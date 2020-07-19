import React,{ Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AVATAR} from '../service/axios'
import moment from "moment";
import MapView, { Marker } from "react-native-maps";
import { Avatar, Icon } from "react-native-elements";

export default class RencontreDetaille extends Component{

    constructor(props){
        super(props)
        this.state = {
            rencontre : {},
            loading : true
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        let item = navigation.getParam('item');
        if(item) this.setState({loading : false,rencontre : item});
    }

    render = () => {
        const { navigation } = this.props;
        const {rencontre, loading} = this.state;
        const {artist, user} = rencontre

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        return <View>
            
            <View style={{flexDirection : 'row'}}>
                    <Avatar size="large" containerStyle={{ width: 90, height: 90, borderColor: '#fff', marginBottom: 5 }} 
                                    source={{ uri: AVATAR+(rencontre.artist.avatar) }} rounded />
                    <Text style={{marginLeft: 15, textAlignVertical: 'center', fontSize: 18, fontWeight : 'bold'}} >{artist.name} { artist.prenom}</Text>
            </View>

            <Text style={{ fontSize: 18, marginLeft: 20 }}>
                                rencontre planifier le  {moment(Date.parse(rencontre.date)).format("DD MMM h:mm:ss")}
            </Text>
            <View style={{
                            flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 15,
                            borderColor: '#bcacaf'
                        }}>
                            <Icon color='#bcacaf' name='map-marker' type='font-awesome' />
                            <Text style={{ fontSize: 16, marginLeft: 20 }}>Location </Text>
            </View>
            <View style={{ flex: 1 }}>
                <MapView style={{ height: 350 }}
                            showsUserLocation
                            loadingEnabled
                            initialRegion={{
                                latitude: Number(rencontre.latLng.split(',')[0]),
                                longitude:  Number(rencontre.latLng.split(',')[1]),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                >
                    <Marker
                        coordinate={{ latitude:  Number(rencontre.latLng.split(',')[0]), longitude:  Number(rencontre.latLng.split(',')[1]) }}
                    />
                </MapView>
            </View>
        </View>
    }

}