import React, {PureComponent} from "react";
import moment from "moment";
import {ActivityIndicator, AsyncStorage, FlatList, View, Text} from "react-native";
import {ButtonGroup} from "react-native-elements";
import EventItem from "./EventItem";
import {SafeAreaView} from "react-navigation";
import axios from "axios";

const API = 'https://event.sadiksoumia.com/api/';
const CATEGORIES = `${API}categories`;
const JOUR1 = 'jour-1';


const http = axios.create({
    headers: {'Accept': 'application/json'}
});

export default class Events extends PureComponent {
    constructor(props) {
        //moment.locale('fr');
        super(props);
        this.state = { 
            data : [],
            events: [], 
            categories : [],
            DaysIndex: 0, 
            loading: true 
        }
    }

    componentDidMount() {
        http.get(CATEGORIES)
             .then( response =>{
                 let data = response.data;
                 let categories = data.map( c => { return  { id : c.id, name : c.name} });
                 let jour1 = data.find(d => d.slug === JOUR1);
                 let events = jour1.events;

                this.setState({ categories, events, loading: false });
             })
             .catch( error => { console.log(error) })
    }

    updateDaysIndex = (selectedIndex) => {
        this.setState({ DaysIndex: selectedIndex, loading: true });
        let id = this.state.categories[selectedIndex].id

        http.get(CATEGORIES + '/'+ id)
            .then(response => {
                let events = response.data.events;
                this.setState({ events, loading: false })
             })
            .catch(error => { console.log(error) })
    }

    categories = () => {
        return 
    }

    render = () => {
        const { categories, events,  loading, DaysIndex } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ButtonGroup
                    onPress={this.updateDaysIndex}
                    selectedIndex={DaysIndex}
                    buttons={categories.map( c => c.name)}
                    selectedButtonStyle={{ backgroundColor: '#7bdfa0' }}
                    selectedTextStyle={{ textTransform : 'capitalize', fontWeight: 'bold', fontSize: 16 }}
                />

                {
                    (loading) ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                            <ActivityIndicator size='large' color="#7bdfa0" />
                        </View>
                        :
                        <FlatList
                            data={events}
                            keyExtractor={(item, index) => index+ ''}
                            renderItem={({ item }) => <EventItem item={item} {...this.props} />} /> 
                }


            </View>
        );
    }

}
