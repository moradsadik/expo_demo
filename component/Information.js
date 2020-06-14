import {View} from "react-native";
import {SocialIcon} from "react-native-elements";
import React from "react";
import TopBar from "./TopBar";

const Information = () => {
    return <View>

        <TopBar title="Information" />
        <SocialIcon title='Facebook' button type='facebook' />
        <SocialIcon title='Youtube' button type='youtube' />
        <SocialIcon title='Twitter' button type='twitter' />
        <SocialIcon title='Instagram' button type='instagram' />
    </View>;

}

export default Information;