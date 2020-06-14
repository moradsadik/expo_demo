import {Text, View} from "react-native";
import React from "react";

const TopBar = (props) => {
    return <View style={{ backgroundColor: '#7bdfa0', justifyContent: "center", paddingVertical:15, alignItems: "center", marginBottom: 5 }} >
        <Text style={{ fontSize: 19, color: '#fff', fontWeight: 'bold' }} > {props.title} </Text>
    </View>;
}

export default TopBar;