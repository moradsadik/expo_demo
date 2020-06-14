import {createBottomTabNavigator} from "react-navigation-tabs";
import Information from "../component/Information";
import FAQ from "../component/faq/FAQ";
import eventStack from "./EventsStack";

const bottomTabStack = createBottomTabNavigator({
        Events: eventStack,
        Information: Information,
        FAQ: FAQ
    }, {
        initialRouteName: 'Events',
        tabBarOptions: {
            activeTintColor: '#38c3a4',
            inactiveTintColor: 'gray',
            showIcon: false,
            labelStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            },
            style: {
                alignItems: 'center'
            }
        }
    }
);



export default bottomTabStack;