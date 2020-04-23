import React, {Component,PureComponent} from 'react';
import {ButtonGroup, Header, Icon, Avatar, SocialIcon  } from 'react-native-elements';
import { Text, View, FlatList,ActivityIndicator, TouchableOpacity , ScrollView  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import  MapView, { Marker }  from 'react-native-maps'; 
import moment from 'moment';
import Accordian from './accordion'

class Events extends PureComponent {
  constructor(props){
    moment.locale('fr');
    super(props);
    this.state = {posts :  [], DaysIndex : 0, loading : true}
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
        this.setState({posts : json, loading : false})
    })
  }

  updateDaysIndex = (selectedIndex) =>{
    this.setState({DaysIndex : selectedIndex , loading : true});
    fetch('https://jsonplaceholder.typicode.com/posts?userId='+(selectedIndex+3))
    .then(response => response.json())
    .then(json => {
        this.setState({posts : json, loading : false})
    })
  }

  render =  () =>{
    const {posts, loading} = this.state;
    return (
    <View style = {{flex :1, backgroundColor : '#fff'}}>
      <ButtonGroup
          onPress = {this.updateDaysIndex}
          selectedIndex = {this.state.DaysIndex}
          buttons={['Jour 1', 'Jour 2', 'Jour 3']}
          selectedButtonStyle = {{backgroundColor : '#7bdfa0'}}
          selectedTextStyle = {{fontWeight : 'bold', fontSize : 16}}
        />

      { 
        (loading )? 
                    <View style={{flex : 1, alignItems : 'center', justifyContent : 'center'}}  >
                      <ActivityIndicator  size='large' color="#7bdfa0" /> 
                    </View>
                  :
                    <FlatList 
                        data = {posts}
                        keyExtractor = {(item)=>  item.id+''}
                        renderItem = { ({item}) => <EventItem item={item} {...this.props} />} />
      }
        

    </View>
    );
  }

}

class EventItem extends PureComponent{

  constructor(props){super(props)}

  render = () => {
    const {item} = this.props;
    return (
        <TouchableOpacity  onPress = {() => this.props.navigation.navigate('EventDetaille', {id : item.id, title : 'Math Kendy'})}>
        <View style={{flex:1, flexDirection : 'row', marginVertical:10,minHeight: 250, marginHorizontal: 10, borderColor : '#dbdbdb', borderWidth : 1}} >
            <View style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:'#ededed', paddingHorizontal : 8}}>
              <Text style={{fontSize:35,marginBottom : 2}}>{moment(new Date()).format("DD")} </Text>
              <Text style={{fontSize:19,marginBottom : 5}}>{moment(new Date()).format("MMM")} </Text>
              <View style={{flexDirection : 'row',marginBottom : 5}}>
                  <Icon style={{fontSize : 5}} name='clock-o' type='font-awesome'/>
                  <Text style={{fontWeight : 'bold'}}> {moment(new Date()).format("h:mm:ss")} </Text>
              </View>
            </View>

            <View style={{flex:2, justifyContent : 'space-around',paddingHorizontal : 10}}>
              <View >
                <Text style={{marginBottom : 10, fontSize:17, fontWeight : 'bold', textTransform : 'capitalize'}}>{item.title}</Text>
                <Text style={{textAlign : 'justify', color : '#666666'}}>{item.body.substring(1,200).concat(' ', '...')}</Text>
              </View>
              <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                  <View style = {{flexDirection : 'row'}}>
                      <Icon color='#bcacaf' name='map-marker' type='font-awesome'/>
                      <Text style={{marginLeft : 10}}>Place Rachedi</Text>
                  </View>
                  <Avatar size="small" source={{ uri:'https://randomuser.me/api/portraits/men/'+item.id+'.jpg'}} rounded />
              </View>
            </View>

        </View>
        </TouchableOpacity >
    );
  }
}

class LeftNavigation extends PureComponent{

  constructor(props){super(props)}

  render = () => {
    return (
      <View>
        <Icon name='arrow-left' color="#fff" type='font-awesome' onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

class EventDetaille extends PureComponent{
  static navigationOptions = {
    title: 'Artists',
  };
  constructor(props){
    super(props);
    this.state = {post : {}}
  }

  componentDidMount = () =>{
    const {navigation} = this.props;
    fetch('https://jsonplaceholder.typicode.com/posts/'+navigation.getParam('id'))
    .then(response => response.json())
    .then(json => {
        this.setState({post : json})
    })
  }

  componentWillUnmount = () =>{
    this.setState({post : {}})
  }

  render = () => {
    const {post} = this.state
    const title = 'Bridget Anderson';
    return (
        <View style={{flex:1, backgroundColor: '#fff'}}>
            <ScrollView>
  
                <View style={{ alignItems : 'center'}}>
                  <Avatar size="xlarge" containerStyle = {{borderWidth : 3, borderColor : '#ccc', marginBottom:5}} source={{ uri:'https://randomuser.me/api/portraits/men/'+post.id+'.jpg'}} rounded />
                  <Text style = {{fontSize : 18, textAlign: 'justify', marginBottom : 10}}>Bridget Anderson</Text>
                </View>
  
                <View style={{ paddingHorizontal : 20, paddingVertical : 10}}>
                  
                  <Text style = {{marginBottom : 10, fontSize:17, fontWeight : 'bold', textTransform : 'capitalize'}}>{post.title}</Text>
  
                  <View style={{padding : 25, borderColor:'#bcacaf', borderWidth:2, marginTop : 10, flexDirection : 'row'}} >
                    <Icon color='#bcacaf' name='clock-o' type='font-awesome'/>
                    <Text style={{fontSize : 18, marginLeft : 20}}>Commence à 17 : 20</Text>
                  </View>
  
                  <View style={{marginVertical: 10,  padding : 10, borderColor:'#bcacaf', borderWidth:2}}>
                <Text style = {{fontSize : 17,marginBottom : 10 }}>{post.body}</Text>
                  </View>
  
                  <View style = {{flexDirection : 'row', padding : 25, borderColor:'#bcacaf', borderWidth:2}}>
                      <Icon color='#bcacaf' name='map-marker' type='font-awesome'/>
                      <Text style = {{fontSize : 16, marginLeft : 20}}>Scene 35 : Marie Lux</Text>
                     
                  </View>

                  <View style={{flex:1,marginTop:10, borderColor:'#bcacaf', borderWidth:1}}>
                    <MapView style={{height:350}}
                            showsUserLocation
                            loadingEnabled
                            initialRegion={{
                              latitude: 37.78825,
                              longitude: -122.4324,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                            }}
                          >
                      <Marker
                            coordinate={{latitude: 37.78825,longitude: -122.4324}}
                            title={post.title}
                            description={post.body}
                        />
                  </MapView>
                  </View>

                  
  
                </View>
  
              </ScrollView>
          </View>
      )
  }
}

const  Artists =  ()=>{
  return (<View> <TopBar  title="Artist " /></View>);
}
const  FAQ =  ()=>{
  const list = [
    { 
      id : 1,
      title: 'Non Veg Biryanis', 
      data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    },
    { 
      id : 2,
      title: 'Pizzas',
      data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
    },
    { 
      id : 3,
      title: 'Drinks',
     data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
    },
    { 
      id : 4,
      title: 'Deserts',
      data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
    },
    { 
      id : 5,
      title: 'Fruits',
      data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
    },
    { 
      id : 6,
      title: 'Voiture',
      data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
    },
    { 
      id : 7,
      title: 'Paiemant',
      data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
    },
  ];

  const items = [];
    for (item of list) {
        items.push(
            <Accordian
                key = {item.id} 
                title = {item.title}
                data = {item.data}
            />
        );
    }
  return (<ScrollView>
    <View>
      <TopBar  title="FAQ" />  
      <View style={{ marginHorizontal: 10}}>
        <Text style={{marginBottom:5, fontSize:14}}>Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser</Text>
        {items}
        </View>
    </View>
  </ScrollView>);
}
const  Information =  ()=>{
  return <View>

    <TopBar title = "Information" />
    <SocialIcon title='Facebook' button type='facebook' />
    <SocialIcon title='Youtube' button type='youtube' />
    <SocialIcon title='Twitter' button type='twitter' />
    <SocialIcon title='Instagram' button type='instagram' />
  </View>;
  
}

const TopBar = (props) =>{
  return <View style={{backgroundColor:'#7bdfa0',  height:50, justifyContent: "center", alignItems:"center", marginBottom:5}} >
    <Text style={{fontSize: 19, color: '#fff', fontWeight: 'bold'}} > {props.title} </Text>
  </View>;
}




const eventStack = createStackNavigator({
  Events: {
    screen: Events,
    navigationOptions: ({ navigation }) => ({
      title: 'Evenements',
      headerStyle: {
        backgroundColor: '#7bdfa0',
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#7bdfa0'
      },
      headerTintColor :'#fff' ,
      headerTitleAlign : 'center'
    }),
  },
  EventDetaille : {
    screen : EventDetaille,
    navigationOptions: ({ navigation }) => ({
      title: 'Evenements '+navigation.getParam('title'),
      headerStyle: {
        backgroundColor: '#7bdfa0',
        height: 50
      },
      headerTintColor :'#fff' 
    }),
  }
});

const AppNavigator = createBottomTabNavigator({
      Events: eventStack,
      Information : Information,
      FAQ : FAQ
  },{
      initialRouteName : 'Events',
      tabBarOptions: {
        activeTintColor: '#38c3a4',
        inactiveTintColor: 'gray',
        showIcon : false,
        labelStyle: {
          fontSize: 18,
          fontWeight : 'bold'
        },
        style: {
          alignItems : 'center' 
        }
      }
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer />
      </View>
    );
  }
}
