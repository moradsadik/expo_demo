import React from "react";
import {createSwitchNavigator} from "react-navigation";
import authenticationStack from "./AuthStack";
import drawernavigation from "./DrawerStack";


const switchnavigation = createSwitchNavigator({
    'Authentification' : authenticationStack,
    'Application' : drawernavigation
})
export {switchnavigation};