import React,{Component} from "react";
import {Text, View,FlatList, ActivityIndicator} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import axios from "axios";

const SOCIALS = 'https://event.sadiksoumia.com/api/socials';
const http = axios.create({
    headers: {'Accept': 'application/json'}
});
export default class Social extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            socials : [],
            loading : true
        }
    }

    componentDidMount(){
        http.get(SOCIALS)
        .then( response =>{
            let socials = response.data;
            socials = socials.map(s => {

                return {...s, color : this.color(s.name.toLowerCase())}
            })
            this.setState({ socials, loading: false });
        })
        .catch( error => { console.log(error) })

    }


    color = (type) => {
        if(type === 'facebook') return "#3b5999"
        else if(type === 'instagram') return "#247ba0"
        else if(type === 'twitter') return "#00aced"
        else if(type === 'youtube') return "#bb0000"
    }
    render() {
        const {socials,loading} = this.state

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }
        return <View>
            <FlatList
                data={socials}
                keyExtractor={(item, index) => index+ ''}
                renderItem={({ item }) =>  <ListItem
                        onPress = {() => {}}
                        key={item.id}
                        leftAvatar={<Icon iconStyle={{fontSize:30}} color={item.color} name={item.name.toLowerCase()} type='feather' />}
                        title = {item.link}
                        bottomDivider  
                    /> 
                } />
        </View>
    }
}