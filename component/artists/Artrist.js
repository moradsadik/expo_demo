import React, { Component } from "react";
import {View, Text,ActivityIndicator, FlatList} from "react-native";
import { ListItem } from "react-native-elements";
import {http,ARTISTS, AVATAR} from '../../service/axios'


export default class Artist extends Component{

    constructor(){
        super()
        this.state = {
            artists : [],
            loading : true
        }
    }

    componentDidMount(){
        http.get(ARTISTS)
        .then( response =>{
            let artists = response.data;
            this.setState({ artists, loading: false });
        })
        .catch( error => { console.log(error) })
    }


    render = () => {
        const { artists, loading } = this.state
        const { navigation } = this.props;

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return <View> 
            <FlatList
                data={artists}
                keyExtractor={(item, index) => index+ ''}
                renderItem={({ item }) =>  <ListItem
                        onPress = {() => navigation.navigate('ArtistDetaille', { id: item.id })}
                        key={item.id}
                        leftAvatar={{ size:"medium",source: { uri: AVATAR+(item.avatar) } }}
                        title={item.name + ' ' + item.prenom}
                        bottomDivider
                        chevron
                        badge={{ value: item.events.length, 
                            status:'warning',
                            textStyle: { color: '#000', fontWeight: 'bold', fontSize:16 },
                            badgeStyle : {paddingHorizontal : 6, paddingVertical : 12}, 
                            containerStyle: {}  
                        }}
                    /> 
                } />
        </View>;
    }
}


