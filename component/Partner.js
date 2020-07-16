import React,{Component} from "react";
import {Text, View,FlatList, ActivityIndicator} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import axios from "axios";

const PARTNERS = 'https://event.sadiksoumia.com/api/partners';
const AVATAR = 'https://event.sadiksoumia.com/uploads/images/partner/';

const http = axios.create({
    headers: {'Accept': 'application/json'}
});
export default class Partner extends Component{
    constructor(props){
        super(props)
        this.state = {
            partners : [],
            loading : true
        }
    }

    componentDidMount(){
        http.get(PARTNERS)
        .then( response =>{
            let partners = response.data;
            this.setState({ partners, loading: false });
        })
        .catch( error => { console.log(error) })

    }
    render() {
        const {partners,loading} = this.state

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return <View>
            <FlatList
                data={partners}
                keyExtractor={(item, index) => index+ ''}
                renderItem={({ item }) =>  <ListItem
                        onPress = {() => {}}
                        key={item.id}
                        leftAvatar={<Avatar rounded size="large"source={{ uri: AVATAR+(item.logo) }} />}
                        title = {item.name}
                        subtitle = {item.service}
                        bottomDivider  
                    /> 
                } />
        </View>
    }
}