import React, {PureComponent} from "react";
import {Dimensions, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {Icon} from "react-native-elements";

export default class Place extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            showMenu: false,
            places: [
                { name: 'place 1', photos: ['https://loremflickr.com/320/240/coffee', 'https://loremflickr.com/320/240/nespresso', 'https://loremflickr.com/320/240/cappuccino'], rating: 4, categorie: 'coffee', latitude: 48.891015, longitude: 2.352073 },
                { name: 'place 2', rating: 3, categorie: 'carburants', latitude: 48.881060, longitude: 2.362073 },
                { name: 'place 3', rating: 4, categorie: 'hotels', latitude: 48.871090, longitude: 2.372073 },
                { name: 'place 4', rating: 4, categorie: 'restaurants', latitude: 48.861030, longitude: 2.382073 },
                { name: 'place 5', rating: 3, categorie: 'parkings', latitude: 48.891070, longitude: 2.392073 },
                { name: 'place 6', rating: 3, categorie: 'hospitals', latitude: 48.901082, longitude: 2.402073 }
            ],
            filtred: [],
            categories: [
                { name: 'coffee', icon: 'coffee', color: '' },
                { name: 'carburants', icon: 'shopping-basket', color: '' },
                { name: 'hotels', icon: 'hotel', color: '' },
                { name: 'restaurants', icon: 'cutlery', color: '' },
                { name: 'parkings', icon: 'car', color: '' },
                { name: 'hospitals', icon: 'hospital-o', color: '' },
                { name: 'all', icon: 'bars', color: '' }
            ]
        }
    }

    componentDidMount() {
        this.setState({ filtred: [...this.state.places] })
    }

    show = (categorie) => {
        let places = [...this.state.places]
        let filtred = places
        if (categorie !== 'all') {
            filtred = places.filter(p => p.categorie === categorie);
        }

        this.setState({ filtred, showMenu: true });

    }

    navigateToPlace = (place) => {
        console.log(place)
        this._map.animateToRegion({
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    render = () => {

        const { categories, showMenu, filtred } = this.state
        const { width, height } = Dimensions.get('window');

        return <View style={{ flex: 1 }}>

            <MapView ref={(map) => this._map = map} style={{ flex: 1 }}
                     showsUserLocation
                     loadingEnabled
                     initialRegion={{
                         latitude: 48.871090,
                         longitude: 2.372073,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}
            >
                {
                    this.state.filtred.map((p, i) => {
                        return <Marker key={i}
                                       coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                                       title={p.name}
                        />
                    })
                }
            </MapView>

            <View style={{ position: 'absolute', width: 'auto', height: 'auto', top: 30, left: 5 }}>
                <Icon reverse name={showMenu ? 'times' : 'bars'} type='font-awesome'
                      color='#fff' size={20} iconStyle={{ color: '#000' }}
                      onPress={() => { this.setState({ showMenu: !showMenu }) }} />
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
                              onPress={() => this.show('coffee')} />
                        <Icon reverse name='hotel' type='font-awesome' color='#e71d36'
                              onPress={() => this.show('hotel')} />
                        <Icon reverse name='shopping-basket' type='font-awesome' color='#ffbe0b'
                              onPress={() => this.show('shop')} />
                        <Icon reverse name='institution' type='font-awesome' color='#ffadad'
                              onPress={() => this.show('shop')} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Icon reverse name='hospital-o' type='font-awesome' color='#fb5607'
                              onPress={() => this.show('hospital')} />
                        <Icon reverse name='car' type='font-awesome' color='#ff006e'
                              onPress={() => this.show('bus')} />
                        <Icon reverse name='cutlery' type='font-awesome' color='#8338ec'
                              onPress={() => this.show('all')} />
                        <Icon reverse name='wheelchair' type='font-awesome' color='#197278'
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
