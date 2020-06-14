import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Icon, Rating} from "react-native-elements";
import React from "react";

const PositionDetaille = ({ item }) => {
    return <View style={{
        position: 'absolute', bottom: 0, left: 0, width: width, maxHeight: height / 2, backgroundColor: '#e5e5e5',
        borderColor: '#ccc', borderTopWidth: 1, flexDirection: 'column'
    }}>
        <TouchableOpacity onPress={() => this.setState({ showMenu: !showMenu })}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="caret-down" type="font-awesome"
                      containerStyle={{ padding: 0, margin: 0, marginTop: -9 }} />
            </View>
        </TouchableOpacity>
        <FlatList
            data={filtred}
            keyExtractor={(item, index) => index + ''}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => this.navigateToPlace(item)}>
                    <View style={{
                        backgroundColor: '#fff', paddingLeft: 18, paddingVertical: 13, marginVertical: 3,
                        borderColor: '#ccc', borderTopWidth: 1, borderBottomWidth: 1
                    }}>
                        {
                            item.photos &&
                            <FlatList style={{ marginVertical: 5 }} data={item.photos} horizontal showsHorizontalScrollIndicator={false}
                                      keyExtractor={(item, index) => index + ''}
                                      renderItem={({ item }) =>
                                          <Image
                                              source={{ uri: item }}
                                              style={{ marginRight: 5, width: 250, height: 150, borderRadius: 10 }}
                                          />
                                      }
                            />
                        }
                        <Text style={{ fontSize: 19, textTransform: 'capitalize' }}>{item.name}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 3 }}>
                            <Text style={{ color: '#22223b' }}>{item.rating},0</Text>
                            <Rating defaultRating={4} count={5} ratingCount={5} imageSize={15} style={{ padding: 0, marginHorizontal: 12 }} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: '#22223b' }}>{item.categorie}</Text>
                            <Text style={{ color: '#4a4e69' }}> - </Text>
                            <Text style={{ color: '#4a4e69' }}>129 boulevard Oued Sebou</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: '#22223b' }}>Ouvert</Text>
                            <Text style={{ color: '#4a4e69' }}> . </Text>
                            <Text style={{ color: '#4a4e69' }}>Ferme à 23:30</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            } />
    </View>
}

export default PositionDetaille;