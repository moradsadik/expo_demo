import React, {Component} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";

class HorizontalMapFiter extends Component {
  render() {
    let {item, categories} = this.props;
    return <View style={{
      position: 'absolute', width: width, height: 50,
      top: 38, left: 5, flexDirection: 'row'
    }}>

      <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({item}) =>
              <TouchableOpacity onPress={() => this.show(item.name)}>
                <View style={{
                  borderColor: '#ccc', borderWidth: 0, backgroundColor: '#fff',
                  marginHorizontal: 3, borderRadius: 100, width: 'auto',
                  padding: 7, height: 38, flexDirection: 'row'
                }}>

                  <Icon name={item.icon} type='font-awesome' containerStyle={{marginHorizontal: 5, paddingVertical: 4}}
                        iconStyle={{fontSize: 14, fontWeight: 'normal'}}/>
                  <Text style={{
                    textTransform: 'capitalize', textAlignVertical: 'center', fontWeight: 'bold', textAlign: 'center',
                    color: '#000'
                  }}> {item.name} </Text>
                </View>
              </TouchableOpacity>
          }
          keyExtractor={(item, index) => index + ''}
      />
    </View>
  }
}