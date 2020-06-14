import {FlatList, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {Component} from "react";
import {Header, Icon} from "react-native-elements";
import {data, filter} from '../../service/faq_data'
import Filter from './Filter'
import Question from './Question'
class FAQ extends React.Component {

    constructor() {
        super();
        this.state = {
            data,
            current :1
        }
    }

    render() {
        let {navigation} = this.props
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
                <Filter />
                <View style={{marginHorizontal: 10}}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item.id + ''}
                        renderItem={({item}) =><Question item={item} />} />
                </View>
            </ScrollView>
        );
    }

}

export default FAQ;