import React, {Component} from "react";
import {filter} from "../../service/faq_data";
import {FlatList, Text, TouchableOpacity, View} from "react-native";

export default class Filter extends Component {

    constructor() {
        super();
        this.state = {
            filters : filter
        }
    }

    render() {
        return <View style={{marginBottom: 10,paddingTop:10 }}>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.filters}
                renderItem={({item,index}) =>
                    <TouchableOpacity>
                        <View style={{
                            borderColor: '#ccc', borderWidth: 0,
                            marginHorizontal: 3,  width: 'auto',
                            padding: 7, height: 'auto', flexDirection: 'row'
                        }}>

                            <Text style={{
                                textTransform: 'capitalize', textAlignVertical: 'center',
                                fontWeight: '300', textAlign: 'center',padding:5, borderRadius : 100,
                                color: '#000', fontSize:(index === 0) ? 16 : 15, borderWidth: (index === 0) ? 1 : 0,
                                backgroundColor: (index === 0) ? '#fff' : '#fff'
                            }}> {item} </Text>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => index + ''}
            />
        </View>
    }
}