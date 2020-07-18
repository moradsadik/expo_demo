import React, {PureComponent} from "react";
import {ActivityIndicator, ImageBackground, ScrollView, Text, View, WebView} from "react-native";
import {Avatar, Icon} from "react-native-elements";
import MapView, {Marker} from "react-native-maps";
import {http,EVENTSID, AVATAR} from '../../service/axios'
import moment from "moment";

export default class EventDetaille extends PureComponent {
    static navigationOptions = {
        title: 'Detaille Evenement',
    };

    constructor(props) {
        super(props);
        //moment.locale('fr');
        this.state = { event: {}, loading : true }
    }

    componentDidMount = () => {

        const { navigation } = this.props;
        let id = navigation.getParam('id');
        http.get(EVENTSID + id)
            .then(response => {
                let event = response.data;
                this.setState({ event, loading : false })
            })
            .catch(error => { console.log(error) })
    }


    render = () => {
        const { event, loading } = this.state

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    <ImageBackground style={{ position: 'relative', flex: 1, resizeMode: "cover", justifyContent: "center", minHeight: 200 }}
                                     source={require('../../assets/images/event.jpg')}>
                        <View style={{ position: 'absolute', top: 145, right: 15, zIndex: 999 }}>
                            <Avatar size="xlarge" containerStyle={{ width: 90, height: 90, borderColor: '#fff', marginBottom: 5 }} 
                                    source={{ uri: AVATAR+(event.artist.avatar) }} rounded />
                        </View>
                    </ImageBackground>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#283d3b', textAlign: 'justify', marginBottom: 5 }}>{event.artist.name} {event.artist.prenom}</Text>
                        <Text style={{ fontSize: 20, color: '#003049', textAlign: 'justify', marginBottom: 5 }}>{event.titre}</Text>
                    </View>

                    <View style={{ marginVertical: 0, paddingHorizontal: 10, textAlign: 'justify' }}>
                        <Text style={{ fontSize: 17, marginBottom: 10 }}>{event.description}</Text>
                    </View>

                    <View>
                        <View style={{
                            padding: 25, borderColor: '#bee3db', backgroundColor: '#e9ecef', marginTop: 10,
                            flexDirection: 'row'
                        }} >
                            <Icon color='#247ba0' name='clock-o' type='font-awesome' />
                            <Text style={{ fontSize: 18, marginLeft: 20 }}>
                                de {moment(Date.parse(event.dateDebut)).format("h:mm:ss")} à {moment(Date.parse(event.dateFin)).format("h:mm:ss")}
                            </Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 15,
                            borderColor: '#bcacaf', borderTopWidth: 1, borderBottomWidth: 0
                        }}>
                            <Icon color='#bcacaf' name='map-marker' type='font-awesome' />
                            <Text style={{ fontSize: 16, marginLeft: 20 }}>Location </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <MapView style={{ height: 350 }}
                                     showsUserLocation
                                     loadingEnabled
                                     initialRegion={{
                                         latitude: Number(event.location.split(',')[0]),
                                         longitude:  Number(event.location.split(',')[1]),
                                         latitudeDelta: 0.0922,
                                         longitudeDelta: 0.0421,
                                     }}
                            >
                                <Marker
                                    coordinate={{ latitude:  Number(event.location.split(',')[0]), longitude:  Number(event.location.split(',')[1]) }}
                                    title={event.titre}
                                    description={event.description}
                                />
                            </MapView>
                        </View>



                    </View>

                </ScrollView>
            </View>
        )
    }
}
