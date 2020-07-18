import React, { Component, PureComponent } from 'react';
import {  View , SafeAreaView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import {switchnavigation} from "./navigation";

const AppContainer = createAppContainer(switchnavigation);
export default class App extends Component {
  render() {
    return (
      <SafeAreaView  style={{ flex: 1 }}>
        <AppContainer />
      </SafeAreaView >
    );
  }
}
