import {FlatList, ScrollView, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import React, {Component} from "react";
import {Icon} from "react-native-elements";
import Question from './Question'
import axios from "axios";


const FAQS = `https://event.sadiksoumia.com/api/faqs`;
const http = axios.create({
    headers: {'Accept': 'application/json'}
});

class FAQ extends Component {

    constructor() {
        super();
        this.state = {
            faqs : [],
            filtred : [],
            current : null,
            categories :[],
            loading:true
        }
    }

    componentDidMount(){
        http.get(FAQS)
            .then(response => {
                let faqs = response.data;
                let categories = new Set(faqs.map( f => { return f.category}))
                let current  = 0
                let filtred = faqs.filter(f => f.category === faqs[0].category);
                this.setState({ faqs, categories:[...categories], current, filtred,  loading : false })
            })
            .catch(error => { console.log(error) })
    }

    filter = (category) => {
        let {faqs, categories} = this.state
        let filtred = faqs.filter( f => f.category === category)
        let current = categories.findIndex( c=> c == category)
        this.setState({filtred, current})
    }

    render() {
        let {loading, filtred, current, categories} = this.state
        let {navigation} = this.props

        if(loading){
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                <ActivityIndicator size='large' color="#7bdfa0" />
            </View>
        }

        return (
            <ScrollView style={{flex: 1}}>
                <View style={{
                    backgroundColor: '#7bdfa0',
                    justifyContent: "space-between",
                    paddingTop: 35, paddingLeft: 12,
                    paddingBottom: 15,
                    flexDirection: "row"
                }}>
                    <Text style={{fontSize: 21, color: '#fff', fontWeight: 'bold'}}> FAQs </Text>
                    <Icon
                        onPress={() => navigation.openDrawer()}
                        name="bars" type="font-awesome" containerStyle={{marginHorizontal: 15}}
                        color="#fff"
                    />
                </View>

                <View style={{marginBottom: 10,paddingTop:10, flexDirection : 'row' }}>
                    {
                        categories.map( (item, index) => {
                            return  <TouchableOpacity key={index} onPress = { () =>  this.filter(item) }>
                            <View style={{
                                borderColor: '#ccc', borderWidth: 0,
                                marginLeft: 10,  width: 'auto',
                                height: 'auto', flexDirection: 'row'
                            }}>
                                <Text style={{
                                    textTransform: 'capitalize', textAlignVertical: 'center',
                                    fontWeight: '300', textAlign: 'center',paddingVertical:5, paddingHorizontal:8, borderRadius : 100,
                                    color: '#000', fontSize:(index === current) ? 16 : 15, 
                                    borderWidth: (index === current) ? 1 : 0,
                                    backgroundColor: (index === current) ? '#fff' : '#fff'
                                }}> {item} </Text>
                            </View>
                        </TouchableOpacity>
                        })
                    }
                </View>

                <View style={{marginHorizontal: 10}}>
                    <FlatList
                        data={filtred}
                        keyExtractor={item => item.id + ''}
                        renderItem={({item}) =><Question item={item} curren={current} />} />
                </View> 

            </ScrollView>
        );
    }

}

export default FAQ;