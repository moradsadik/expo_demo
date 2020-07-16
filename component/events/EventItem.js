import React, {PureComponent} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Avatar, Icon} from "react-native-elements";
import moment from "moment";

const AVATAR = 'https://event.sadiksoumia.com/uploads/images/artists/';
export default class EventItem extends PureComponent {

    constructor(props) { super(props) }

    render = () => {
        const { item, navigation } = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('EventDetaille', { id: item.id, title: item.titre })}>
                <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10, minHeight: 250, marginHorizontal: 10, borderColor: '#dbdbdb', borderWidth: 1 }} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', paddingHorizontal: 8 }}>

                        <Avatar size="large" source={{ uri: AVATAR+(item.artist.avatar) }} rounded />

                        <Text style={{ fontSize: 35, marginBottom: 2 }}>{moment(Date.parse(item.dateDebut)).format("DD")} </Text>
                        <Text style={{ fontSize: 19, marginBottom: 5 }}>{moment(Date.parse(item.dateDebut)).format("MMM")} </Text>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Icon style={{ fontSize: 5 }} name='clock-o' type='font-awesome' />
                            <Text style={{ fontWeight: 'bold' }}> {moment(Date.parse(item.dateDebut)).format("h:mm:ss")} </Text>
                        </View>
                    </View>

                    <View style={{ flex: 2, justifyContent: 'space-around', paddingHorizontal: 10 }}>
                        <View >
                            <Text style={{ marginBottom: 10, fontSize: 17, fontWeight: 'bold', textTransform: 'capitalize' }}>{item.titre}</Text>
                            <Text style={{ textAlign: 'justify', color: '#666666' }}>{item.description.substring(1, 200).concat(' ', '...')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon color='#2d6a4f' name='map-marker' type='font-awesome' size = {17} />
                                <Text style={{ marginLeft: 10 }}>256 Place Rachedi, Rue bino sori</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity >
        );
    }
}
