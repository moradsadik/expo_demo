import React, {PureComponent} from "react";
import {Dimensions, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {Icon} from "react-native-elements";
import axios from "axios";

const API = 'https://event.sadiksoumia.com/api/';
const PLACES = `${API}places`;

const http = axios.create({
    headers: {'Accept': 'application/json'}
});

export default class Place extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            showMenu: false,
            places: [],
            filtred: []
        }
    }

    componentDidMount() {
        http.get(PLACES)
            .then(response => {
                let places = response.data
                let filtred = [...places]
                this.setState({ places, filtred })
            })
            .catch(error => { console.log(error) })
    }


    show = (categorie) => {
        let places = [...this.state.places]
        let filtred = places
        if (categorie !== 'all') {
            filtred = places.filter(p => p.type.toLowerCase() === categorie);
        }

        this.setState({ filtred, showMenu: true });

    }

    navigateToPlace = (latitude, longitude ) => {
        console.log(place)
        this._map.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    render = () => {

        const { categories, showMenu, filtred } = this.state
        const {navigation} = this.props;
        let initialLocation = {
            latitude: 48.76696707446949,
            longitude: 2.340671207171585,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        return <View style={{ flex: 1 }}>

            <MapView ref={(map) => this._map = map} style={{ flex: 1 }} 
                     showsUserLocation maxZoomLevel={1000}
                     loadingEnabled 
                     initialRegion={initialLocation}   >
                {
                    filtred.map((p, i) => {
                        let latitude  = Number(p.latLng.split(',')[0]);
                        let longitude = Number(p.latLng.split(',')[1]);;
                        return <Marker key={i}
                                       coordinate={{ latitude, longitude }}
                                       title={p.name}
                        />
                    })
                }
            </MapView>

            <View style={{ position: 'absolute', width: 'auto', height: 'auto', top: 30, left: 5 }}>
                <Icon reverse name={showMenu ? 'x' : 'map-pin'} type='feather'
                      color='#fff' size={20} iconStyle={{ color: '#000' }}
                      onPress={() => { this.setState({ showMenu: !showMenu }) }} />
            </View>

            <View style={{ position: 'absolute', width: 'auto', height: 'auto', top: 30, right: 5 }}>
                <Icon reverse name='menu' type='feather'
                      color='#fff' size={20} iconStyle={{ color: '#000' }}
                      onPress={() => navigation.openDrawer()}  />
            </View>

            {showMenu &&
            <>

                <View style={{
                    borderRadius: 10, opacity: 0.9, borderWidth: 1, borderColor: '#ccc', zIndex: 999,
                    position: 'absolute', height: 'auto', bottom: 10, left: 20, padding: 10,
                    backgroundColor: '#fff', width: Dimensions.get('window').width - 40
                }}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Icon reverse name='coffee' type='font-awesome' color='#0077b6'
                              onPress={() => this.show('cafe')} />
                        <Icon reverse name='male-female' type='foundation' color='#e71d36'
                              onPress={() => this.show('toilette')} />
                        <Icon reverse name='shopping-cart' type='feather' color='#ffbe0b'
                              onPress={() => this.show('boutique')} />
                        <Icon reverse name='car' type='font-awesome' color='#ffadad'
                              onPress={() => this.show('parking')} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Icon reverse name='beer' type='font-awesome' color='#fb5607'
                              onPress={() => this.show('buvette')} />
                        <Icon reverse name='cutlery' type='font-awesome' color='#197278'
                              onPress={() => this.show('restaurant')} />
                        <Icon reverse name='wheelchair' type='font-awesome' color='#197278'
                              onPress={() => this.show('passage')} />
                        <Icon reverse name='bars' type='font-awesome' color='#8338ec'
                              onPress={() => this.show('all')} />
                    </View>

                </View>
                <View style={{ position: 'absolute', width: 'auto', height: 'auto', bottom: 138, right: 7, zIndex: 9999 }}>
                    <Icon reverse name='times' type='font-awesome' color="#f00" size={11}
                          onPress={() => { this.setState({ showMenu: !showMenu }) }} />
                </View>
            </>
            }
        </View>
    }
}
