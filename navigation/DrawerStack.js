import React from "react";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {Avatar, Icon} from "react-native-elements";
import {Dimensions, ScrollView, Text, View, ImageBackground} from "react-native";
import eventStack from "./EventsStack";
import Partner from "../component/Partner";
import Place from "../component/places/Place";
import FAQ from "../component/faq/FAQ";
import Social from '../component/social'
import artistStack from './ArtistStack'
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { createStackNavigator } from "react-navigation-stack";
import rencontreStack from "./RencontreStack";

const DrawerContent = (props) => {

    return <ScrollView>
        <View style={{flex: 1}}>
            <ImageBackground style={{ flex: 1, 
                                justifyContent: "center", minHeight: 200 }}
                                source={require('../assets/images/drawer.jpeg')}>
                <View style={{flex: 1, position: 'absolute', bottom : 0, left : 15, width:80}}>
                    <Icon 
                      containerStyle={{borderRadius:100, padding: 10, 
                                       borderWidth:5, borderColor:'#fff'}} 
                      iconStyle={{fontSize:50}} 
                      color="#fff" name="user" type='feather' 
                    />
                    <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center',
                                  color:'#fff', justifyContent: 'center'}}></Text>
                </View>
            </ImageBackground>
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
        screen: rencontreStack,
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
    unmountInactiveRoutes : true,
    hideStatusBar: true,
    contentOptions: {
        activeTintColor: '#f8961e',
        activeBackgroundColor: '#fff',
        labelStyle: {fontWeight: 'bold'},
        iconContainerStyle: {padding: 0}
    }
})


export default drawernavigation;