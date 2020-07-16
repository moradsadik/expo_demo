import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import {Icon} from "react-native-elements";
import Artist from "../component/artists/Artrist";
import ArtistDetaille from "../component/artists/ArtistDetaille";

const artistStack = createStackNavigator({
    Artist: {
        screen: Artist,
        navigationOptions: ({navigation}) => ({
            title: 'Artists',
            headerStyle: {
                backgroundColor: '#7bdfa0',
                borderBottomWidth: 2,
                borderBottomColor: '#7bdfa0'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
                <Icon
                    onPress={() => navigation.openDrawer()}
                    name="bars" type="font-awesome" containerStyle={{marginHorizontal: 15}}
                    color="#fff"
                />
            ),
        }),
    },
    ArtistDetaille: {
        screen: ArtistDetaille,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#7bdfa0',
                borderBottomWidth: 2,
                borderBottomColor: '#7bdfa0',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center'
        }),
    }
});
export default artistStack;