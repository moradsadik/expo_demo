import {Text, View} from "react-native";
import React from "react";

const TopBar = (props) => {
    return <View style={{ backgroundColor: '#7bdfa0', height:50, justifyContent: "center",paddingTop: 50, paddingBottom:30, alignItems: "center", marginBottom: 5 }} >
        <Text style={{ fontSize: 19, color: '#fff', fontWeight: 'bold' }} > {props.title} </Text>
    </View>;
}

export default TopBar;