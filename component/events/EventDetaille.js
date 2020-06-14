import React, {PureComponent} from "react";
import {AsyncStorage, ImageBackground, ScrollView, Text, View} from "react-native";
import {Avatar, Icon} from "react-native-elements";
import MapView, {Marker} from "react-native-maps";

export default class EventDetaille extends PureComponent {
    static navigationOptions = {
        title: 'Artists',
    };
    constructor(props) {
        super(props);
        this.state = { post: {} }
    }

    componentDidMount = () => {

        const { navigation } = this.props;
        fetch('https://jsonplaceholder.typicode.com/posts/' + navigation.getParam('id'))
            .then(response => response.json())
            .then(json => {
                this.setState({ post: json })
            })
    }

    componentWillUnmount = () => {
        this.setState({ post: {} })
    }

    render = () => {
        const { post } = this.state
        const title = 'Bridget Anderson';
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    <ImageBackground style={{ position: 'relative', flex: 1, resizeMode: "cover", justifyContent: "center", minHeight: 200 }}
                                     source={require('../../assets/images/event.jpg')}>
                        <View style={{ position: 'absolute', top: 145, right: 15, zIndex: 999 }}>
                            <Avatar size="xlarge" containerStyle={{ width: 90, height: 90, borderWidth: 5, borderColor: '#fff', marginBottom: 5 }} source={{ uri: 'https://randomuser.me/api/portraits/men/' + post.id + '.jpg' }} rounded />
                        </View>
                    </ImageBackground>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#283d3b', textAlign: 'justify', marginBottom: 10 }}>Bridget Anderson</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', textTransform: 'capitalize' }}>{post.title}</Text>

                    </View>
                    <View>
                        <View style={{
                            padding: 25, borderColor: '#bee3db', backgroundColor: '#e9ecef', marginTop: 10,
                            flexDirection: 'row'
                        }} >
                            <Icon color='#247ba0' name='clock-o' type='font-awesome' />
                            <Text style={{ fontSize: 18, marginLeft: 20 }}>Commence à 17 : 20</Text>
                        </View>

                        <View style={{ marginVertical: 10, padding: 12, textAlign: 'justify' }}>
                            <Text style={{ fontSize: 17, marginBottom: 10 }}>{post.body}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 15,
                            borderColor: '#bcacaf', borderTopWidth: 1, borderBottomWidth: 0
                        }}>
                            <Icon color='#bcacaf' name='map-marker' type='font-awesome' />
                            <Text style={{ fontSize: 16, marginLeft: 20 }}>Scene 35 : Marie Lux</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <MapView style={{ height: 350 }}
                                     showsUserLocation
                                     loadingEnabled
                                     initialRegion={{
                                         latitude: 37.78825,
                                         longitude: -122.4324,
                                         latitudeDelta: 0.0922,
                                         longitudeDelta: 0.0421,
                                     }}
                            >
                                <Marker
                                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                                    title={post.title}
                                    description={post.body}
                                />
                            </MapView>
                        </View>



                    </View>

                </ScrollView>
            </View>
        )
    }
}
