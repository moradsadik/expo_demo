import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {Avatar, Icon} from "react-native-elements";
import Place from "../component/places/Place";
import FAQ from "../component/faq/FAQ";
import {AsyncStorage, Dimensions, ScrollView, Text, View} from "react-native";
import React, {useEffect} from "react";
import eventStack from "./EventsStack";
import authenticationStack from "./AuthStack";

const DrawerContent = (props) => {
    return <ScrollView>
        <View style={{flex: 1}}>
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#95d5b2',
                padding: 10, borderBottomColor: '#52b788', borderBottomWidth: 1
            }}>
                <Avatar rounded size="xlarge"
                        containerStyle={{}}
                        source={{uri: 'https://randomuser.me/api/portraits/men/75.jpg'}}/>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>John Doe</Text>
            </View>
            <DrawerItems {...props} />
        </View>
    </ScrollView>
}


const drawernavigation = createDrawerNavigator({
    'Evenement': {
        screen: eventStack,
        navigationOptions: {
            drawerLabel: 'Evenement',
            drawerIcon: ({tintColor}) => (
                <Icon name='bars' type="font-awesome" color={tintColor}/>
            )
        }
    },
    Place: {
        screen: Place,
        navigationOptions: {
            drawerLabel: 'Places',
            drawerIcon: ({tintColor}) => (
                <Icon name='map-marker' type="font-awesome" color={tintColor}/>
            )
        }
    },
    'FAQ': {
        screen: FAQ,
        navigationOptions: {
            drawerLabel: 'Qusetion Reponse',
            drawerIcon: ({tintColor}) => (
                <Icon name='align-left' type="font-awesome" color={tintColor}/>
            )
        }
    }
}, {
    contentComponent: DrawerContent,
    drawerWidth: Dimensions.get('window').width * 0.85,
    hideStatusBar: true,
    contentOptions: {
        activeTintColor: '#f8961e',
        activeBackgroundColor: '#fff',
        labelStyle: {fontWeight: 'bold'},
        iconContainerStyle: {padding: 0}
    }
})


export default drawernavigation;