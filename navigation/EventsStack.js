import {createStackNavigator} from "react-navigation-stack";
import Events from "../component/events/Events";
import {Icon} from "react-native-elements";
import EventDetaille from "../component/events/EventDetaille";
import React from "react";

const eventStack = createStackNavigator({
    Events: {
        screen: Events,
        navigationOptions: ({navigation}) => ({
            title: 'Evenements',
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
    EventDetaille: {
        screen: EventDetaille,
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
export default eventStack;