import React,{Component} from "react";
import {Text, View, ActivityIndicator, FlatList} from "react-native";
import {http,USERS,AVATAR} from '../service/axios'
import { ListItem, Avatar } from "react-native-elements";
import { getToken } from "../service/storage";
import { tokenToJson, isEmpty } from "../service/utils";

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
        getToken().then( token => {
            if(token == undefined || token === null || token === ''){
                
            }
            else{ 
                let {id} = tokenToJson(token.split('.')[1])
                http.get(USERS +'/'+id+'/rencontres')
                    .then(response => {
                        let renconters = response.data;
                        this.setState({ renconters, loading : false })
                    })
                    .catch(error => { console.log(error) })
            }
        })
        
    }

    

    render() {

        let {renconters, loading} = this.state;
        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        if(isEmpty(renconters)){
            console.log('empty')
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
                <Text style={{fontSize : 20,  color : '#354f52' }} >📭 Aucune rencontre planifier</Text>
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