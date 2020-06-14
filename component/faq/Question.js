import React from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";

export default class Question extends React.Component {

    constructor() {
        super();
        this.state = { open : false}
    }

    render() {
        let {item} = this.props
        let {open} = this.state

        return <View style={{ borderRadius:3, marginBottom: 5}}>
            <TouchableWithoutFeedback onPress={() => this.setState({open : !open})}>
                <View style={{flex:1, flexDirection: "row", borderBottomWidth: 1, borderColor:'#dbdbdb'}}>
                    <Text style={{color:'#1563a7',
                        fontSize: 18,fontWeight: "bold",
                        paddingVertical:15, paddingHorizontal:10}}>Q.</Text>
                    <Text style={{flex:1, paddingTop:17, fontSize: 16}}>{item.title} ?</Text>
                </View>
            </TouchableWithoutFeedback>
            {open &&<View style={{flex:1, flexDirection: "row", marginTop: 5}}>
                <Text style={{color:'#1563a7',marginLeft:12,
                    fontSize: 18,fontWeight: "bold"}}>R.</Text>
                <Text style={{flex:1,paddingHorizontal:15,color:'#6f6f6f', fontSize:15, flexWrap:"wrap"}} >{item.data}</Text>
            </View>}
        </View>;
    }
}