import React, {PureComponent} from "react";
import moment from "moment";
import {ActivityIndicator, AsyncStorage, FlatList, View} from "react-native";
import {ButtonGroup} from "react-native-elements";
import EventItem from "./EventItem";
import {SafeAreaView} from "react-navigation";

export default class Events extends PureComponent {
    constructor(props) {
        moment.locale('fr');
        super(props);
        this.state = { posts: [], DaysIndex: 0, loading: true }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({ posts: json, loading: false })
            })
    }

    updateDaysIndex = (selectedIndex) => {
        this.setState({ DaysIndex: selectedIndex, loading: true });
        fetch('https://jsonplaceholder.typicode.com/posts?userId=' + (selectedIndex + 3))
            .then(response => response.json())
            .then(json => {
                this.setState({ posts: json, loading: false })
            })
    }

    render = () => {
        const { posts, loading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ButtonGroup
                    onPress={this.updateDaysIndex}
                    selectedIndex={this.state.DaysIndex}
                    buttons={['Jour 1', 'Jour 2', 'Jour 3']}
                    selectedButtonStyle={{ backgroundColor: '#7bdfa0' }}
                    selectedTextStyle={{ fontWeight: 'bold', fontSize: 16 }}
                />

                {
                    (loading) ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}  >
                            <ActivityIndicator size='large' color="#7bdfa0" />
                        </View>
                        :
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item.id + ''}
                            renderItem={({ item }) => <EventItem item={item} {...this.props} />} />
                }


            </View>
        );
    }

}
