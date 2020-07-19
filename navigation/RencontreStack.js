import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import {Icon} from "react-native-elements";
import Rencontre from "../component/Rencontre";
import RencontreDetaille from "../component/RencontreDetaille";

const rencontreStack = createStackNavigator({
    Rencontre: {
        screen: Rencontre,
        navigationOptions: ({navigation}) => ({
            title: 'Rencontres',
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
    RencontreDetaille: {
        screen: RencontreDetaille,
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
export default rencontreStack;