import React from "react";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {Avatar, Icon} from "react-native-elements";
import {Dimensions, ScrollView, Text, View, Button, AsyncStorage} from "react-native";
import eventStack from "./EventsStack";
import Partner from "../component/Partner";
import Place from "../component/places/Place";
import FAQ from "../component/faq/FAQ";
import Social from '../component/social'
import artistStack from './ArtistStack'
import Rencontre from "../component/Rencontre";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";

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
            <TouchableNativeFeedback onPress = { () => props.navigation.navigate('Logout') } >
                <View style ={{flexDirection : 'row', marginHorizontal : 18}}>
                    <Icon name='log-out' type="feather" color = '#354f52'/>
                    <Text style={{fontWeight : 'bold', marginLeft: 30, marginTop : 2}}>Se déconnecter</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    </ScrollView>
}


const drawernavigation = createDrawerNavigator({
    'Evenement': {
        screen: eventStack,
        navigationOptions: {
            drawerLabel: 'Evenement',
            drawerIcon: ({tintColor}) => (
                <Icon name='music' type="feather" color={tintColor}/>
            )
        }
    },
    'Artists': {
        screen: artistStack,
        navigationOptions: {
            drawerLabel: 'Artists',
            drawerIcon: ({tintColor}) => (
                <Icon name='user' type="feather" color={tintColor}/>
            )
        }
    },
    Place: {
        screen: Place,
        navigationOptions: {
            drawerLabel: 'Places',
            drawerIcon: ({tintColor}) => (
                <Icon name='map-pin' type="feather" color={tintColor}/>
            )
        }
    },
    Rencontre: {
        screen: Rencontre,
        navigationOptions: {
            drawerLabel: 'Rencontres',
            drawerIcon: ({tintColor}) => (
                <Icon name='user-plus' type="feather" color={tintColor}/>
            )
        }
    },
    Partner: {
        screen: createStackNavigator({
            Partner: {
                screen: Partner,
                navigationOptions: ({navigation}) => ({
                    title: 'Partenaires',
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
            }
        }),
        navigationOptions: {
            drawerLabel: 'Partenaires',
            drawerIcon: ({tintColor}) => (
                <Icon name='users' type="feather" color={tintColor}/>
            )
        }
    },
    Social: {
        screen: createStackNavigator({
            Social: {
                screen: Social,
                navigationOptions: ({navigation}) => ({
                    title: 'Réseaux sociaux',
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
            }
        }),
        navigationOptions: {
            drawerLabel: 'Réseaux sociaux',
            drawerIcon: ({tintColor}) => (
                <Icon name='share-2' type="feather" color={tintColor}/>
            )
        }
    },
    'FAQ': {
        screen: FAQ,
        navigationOptions: {
            drawerLabel: 'Qusetion Reponse',
            drawerIcon: ({tintColor}) => (
                <Icon name='help-circle' type="feather" color={tintColor}/>
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