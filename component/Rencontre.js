import React,{Component} from "react";
import {Text, View, ActivityIndicator, FlatList} from "react-native";
import {http,USERS,AVATAR} from '../service/axios'
import { ListItem, Avatar } from "react-native-elements";

export default class Rencontre extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            renconters : []
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        let id = navigation.getParam('id');
        http.get(USERS +'/7/rencontres')
            .then(response => {
                let renconters = response.data;
                this.setState({ renconters, loading : false })
            })
            .catch(error => { console.log(error) })
    }

    render() {

        let {renconters, loading} = this.state;
        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return <View>
            <FlatList
                data={renconters}
                keyExtractor={(item, index) => index+ ''}
                renderItem={({ item }) =>  <ListItem
                        onPress = {() => {}}
                        key={item.id}
                        leftAvatar={<Avatar rounded size="medium" source={{ uri: AVATAR+(item.artist.avatar) }} />}
                        title = {
                            'Votre demande de rencontre avec '+ item.artist.name+' '+item.artist.prenom + ' '+( item.latLng ? ' a été approvue' : ' est en cours de traitement')
                        }
                        bottomDivider  
                    /> 
                } />
        </View>
    }
}