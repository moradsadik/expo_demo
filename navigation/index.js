import React from "react";
import {createSwitchNavigator} from "react-navigation";
import authenticationStack from "./AuthStack";
import drawernavigation from "./DrawerStack";
import Redirect from "../component/authentifications/redirect";


const switchnavigation = createSwitchNavigator({
    'Redirection' : Redirect,
    'Authentification' : authenticationStack,
    'Application' : drawernavigation
})
export {switchnavigation};