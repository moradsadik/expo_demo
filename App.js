import React, {Component,PureComponent} from 'react';
import {ButtonGroup, Header, Icon, Avatar, SocialIcon, Rating  } from 'react-native-elements';
import { Image, Text, View, FlatList,ActivityIndicator, TouchableOpacity , ScrollView, Dimensions,SafeAreaView, ImageBackground  } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import  MapView, { Marker }  from 'react-native-maps'; 
import moment from 'moment';
import Accordian from './accordion'
//import SafeAreaView from 'react-native-safe-area-view';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

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
    const {item, navigation} = this.props;
    return (
        <TouchableOpacity  onPress = {() => navigation.navigate('EventDetaille', {id : item.id, title : 'Math Kendy'})}>
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
                <ImageBackground style={{position:'relative',flex: 1, resizeMode: "cover", justifyContent: "center", minHeight:200}} 
                                 source = {require('./assets/images/event.jpg')}>
                    <View style={{position:'absolute', top:145, right:15, zIndex:999}}>
                      <Avatar size="xlarge" containerStyle = {{width: 90, height:90, borderWidth : 5, borderColor : '#fff', marginBottom:5}} source={{ uri:'https://randomuser.me/api/portraits/men/'+post.id+'.jpg'}} rounded />
                    </View>
                </ImageBackground>
  
                <View style={{ paddingHorizontal : 20, paddingVertical : 10}}>
                  
                  <Text style = {{fontSize : 18, fontWeight : 'bold',color:'#3a506b', textAlign: 'justify', marginBottom : 10}}>Bridget Anderson</Text>

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
  return <View style={{backgroundColor:'#7bdfa0',  height:80, justifyContent: "center", alignItems:"center", marginBottom:5}} >
    <Text style={{fontSize: 19, color: '#fff', fontWeight: 'bold'}} > {props.title} </Text>
  </View>;
}

class  Home extends PureComponent {

  constructor(props){
    super(props)
    this.state = {
      showMenu : false,
      places : [
          {name:'place 1', photos : ['https://loremflickr.com/320/240/coffee','https://loremflickr.com/320/240/nespresso','https://loremflickr.com/320/240/cappuccino'], rating:4, categorie:'coffee', latitude: 48.891015,longitude:2.352073},
          {name:'place 2', rating:3, categorie:'carburants', latitude:48.881060,longitude:2.362073},
          {name:'place 3', rating:4, categorie:'hotels', latitude: 48.871090,longitude: 2.372073},
          {name:'place 4', rating:4, categorie:'restaurants', latitude: 48.861030,longitude: 2.382073},
          {name:'place 5', rating:3, categorie:'parkings', latitude: 48.891070,longitude: 2.392073},
          {name:'place 6', rating:3, categorie:'hospitals', latitude: 48.901082,longitude: 2.402073}
      ],
      filtred : [],
      categories : [
            {name : 'coffee', icon:'coffee', color:''}, 
            {name : 'carburants', icon:'shopping-basket', color:''}, 
            {name : 'hotels', icon:'hotel', color:''}, 
            {name : 'restaurants', icon:'cutlery', color:''}, 
            {name : 'parkings', icon:'car', color:''}, 
            {name : 'hospitals', icon:'hospital-o', color:''}, 
            {name : 'all', icon:'bars', color:''}
      ]
    }
  }

  componentDidMount(){
    this.setState({filtred : [...this.state.places]})
  }

  show = (categorie) => {
      let places = [...this.state.places]
      let filtred = places
      if(categorie !== 'all'){
         filtred = places.filter(p => p.categorie === categorie);
      }  
      
      this.setState({filtred, showMenu: true});
     
  }

  navigateToPlace = (place) => {
    console.log(place)
    this._map.animateToRegion({
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
  }

  render = ()=>{

    const {categories, showMenu, filtred} = this.state
    const {width, height} = Dimensions.get('window');

    return <View style={{flex:1}}>
      

     <MapView ref = {(map) => this._map = map}  style={{flex:1}}
                showsUserLocation
                loadingEnabled
                initialRegion={{
                  latitude: 48.871090,
                  longitude: 2.372073,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
          {
            this.state.filtred.map((p,i) => {
              return <Marker key={i}
                  coordinate={{latitude: p.latitude,longitude:p.longitude}}
                  title={p.name}
              />
            })
          }
      </MapView>
      
      <View style={{position:'absolute', width:width, height:50,
                     top:38, left: 5, flexDirection: 'row'}}>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => 
              <TouchableOpacity onPress = {() => this.show(item.name)}>
                <View  style={{borderColor:'#ccc', borderWidth: 0,borderWidth:1,
                                      borderColor: '#aaa', backgroundColor: '#fff', 
                                      marginHorizontal:3, borderRadius:100, width: 'auto', 
                                      padding:7, height:38, flexDirection: 'row'}}>
                                              
                  <Icon  name={item.icon} type='font-awesome' containerStyle={{marginHorizontal:5, paddingVertical: 4}} iconStyle={{fontSize: 14, fontWeight:'normal'}}/>
                  <Text style={{textTransform:'capitalize', textAlignVertical:'center' ,fontWeight: 'bold', textAlign: 'center', color: '#000', 
                                fontWeight: 'normal'}}> {item.name} </Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index+''}
          />
      </View>
      { showMenu &&
      <View style={{position:'absolute', bottom:0, left:0, width:width, maxHeight:height/2, backgroundColor: '#e5e5e5',
                    borderColor:'#ccc', borderTopWidth:1, flexDirection:'column'}}>
          <TouchableOpacity onPress = {() => this.setState({showMenu : !showMenu})}>
            <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
              <Icon name="caret-down" type="font-awesome" 
                    containerStyle={{padding:0, margin:0, marginTop:-9}} />
            </View>
          </TouchableOpacity>            
          <FlatList 
              data = {filtred} 
              keyExtractor={(item, index) => index+''}
              renderItem ={({ item }) =>  
                  <TouchableOpacity onPress = {() => this.navigateToPlace(item)}>
                    <View style={{ backgroundColor : '#fff', paddingLeft:18, paddingVertical:13, marginVertical:3,
                                  borderColor:'#ccc',borderTopWidth:1, borderBottomWidth:1}}>
                      {
                        item.photos &&
                        <FlatList style ={{marginVertical : 5}} data = {item.photos} horizontal showsHorizontalScrollIndicator = {false}
                                  keyExtractor = {(item, index) => index+''}
                                  renderItem = { ({item}) =>
                                      <Image
                                      source={{ uri: item }}
                                      style={{ marginRight:5, width:250, height:150, borderRadius : 10 }}
                                      />
                                    }  
                          />
                      }
                      <Text style={{fontSize:19, textTransform: 'capitalize'}}>{item.name}</Text>
                      <View style={{flex:1, flexDirection:'row', marginVertical:3}}>
                        <Text style={{color : '#22223b'}}>{item.rating},0</Text> 
                        <Rating defaultRating = {4} count={5} ratingCount = {5} imageSize={15}  style={{padding:0, marginHorizontal:12}}  />
                      </View>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={{color : '#22223b'}}>{item.categorie}</Text>
                        <Text style={{color : '#4a4e69'}}> - </Text>
                        <Text style={{color : '#4a4e69'}}>129 boulevard Oued Sebou</Text>
                      </View>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={{color : '#22223b'}}>Ouvert</Text>
                        <Text style={{color : '#4a4e69'}}> . </Text>
                        <Text style={{color : '#4a4e69'}}>Ferme à 23:30</Text>
                      </View>
                    </View> 
                  </TouchableOpacity>
              } />
      </View>
      }

      {/* <View style={{ position:'absolute', width:'auto', height:'auto', bottom:30, left:5 }}>
        <Icon reverse name={showMenu ? 'times' : 'bars'} type='font-awesome'  
                      color='#63b7af'
                      onPress = {() => {this.setState({showMenu : !showMenu})}} />
      </View> 
      <View style={{ borderRadius:10,opacity:0.9, borderWidth:1,borderColor: '#ccc', 
                    position:'absolute',height:'auto', bottom:10, left:20,padding: 10, 
                    backgroundColor : '#fff',width : Dimensions.get('window').width -40}}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Icon reverse name='coffee' type='font-awesome'  color='#0077b6'
                      onPress = {() => this.show('coffee')} />
                    <Icon reverse name='hotel' type='font-awesome' color='#e71d36'  
                     onPress = {() => this.show('hotel')} />
                    <Icon reverse name='shopping-basket' type='font-awesome' color='#ffbe0b' 
                     onPress = {() => this.show('shop')} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Icon reverse name='hospital-o' type='font-awesome'  color='#fb5607'
                     onPress = {() => this.show('hospital')} />
                    <Icon reverse name='car' type='font-awesome' color='#ff006e' 
                     onPress = {() => this.show('bus')} />
                    <Icon reverse name='ellipsis-h' type='font-awesome' color='#8338ec' 
                     onPress = {() => this.show('all')} />
            </View>
      </View>
      */}

    </View>
  }
}

const DrawerContent = (props) => {
  return <ScrollView>
      <View style={{flex:1}} >
        <View style={{ flex : 1,justifyContent : 'center', alignItems : 'center', backgroundColor : '#95d5b2',
                      padding: 10, borderBottomColor: '#52b788', borderBottomWidth:1}}>
             <Avatar rounded size="xlarge"
               containerStyle={{}}
               source={{uri:'https://randomuser.me/api/portraits/men/75.jpg' }} />
             <Text style={{fontSize:15, fontWeight: 'bold'}}>John Doe</Text>  
        </View>
        <DrawerItems {...props} />
      </View>
    </ScrollView>
}

const eventStack = createStackNavigator({
  Events: {
    screen: Events,
    navigationOptions: ({ navigation }) => ({
      title: 'Evenements',
      headerStyle: {
        backgroundColor: '#7bdfa0',
        height: 80,
        borderBottomWidth: 2,
        borderBottomColor: '#7bdfa0'
      },
      headerTintColor :'#fff' ,
      headerTitleAlign : 'center',
      headerRight: () => (
        <Icon
          onPress={() => navigation.openDrawer()}
          name="bars" type="font-awesome" containerStyle = {{marginHorizontal: 15}}
          color="#fff"
        />
      ),
    }),
  },
  EventDetaille : {
    screen : EventDetaille,
    navigationOptions: ({ navigation }) => ({
      headerMode : 'none',
      headerShown : false
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

const drawernavigation = createDrawerNavigator({
  'Application' : {
    screen: AppNavigator,
    navigationOptions : {
      drawerLabel: 'Application',
      drawerIcon: ({ tintColor }) => (
          <Icon  name='bars' type="font-awesome"  color = {tintColor}/>
      )
    }
  },
  Home : {
    screen : Home,
    navigationOptions : {
      drawerLabel: 'Places',
      drawerIcon: ({ tintColor }) => (
          <Icon  name='map-marker' type="font-awesome"  color = {tintColor}/>
      )
    }
  },
}, {
  contentComponent  : DrawerContent,
  drawerWidth : Dimensions.get('window').width * 0.85,
  hideStatusBar : true,
  contentOptions  : {
    activeTintColor  : '#f8961e',
    activeBackgroundColor : '#fff',
    labelStyle : {fontWeight : 'bold'},
    iconContainerStyle : {padding : 0}
  }
})

const AppContainer = createAppContainer(drawernavigation);
export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppContainer />
      </View>
    );
  }
}
