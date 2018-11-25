import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Cocktails from './Cocktails'
import Cocktail from './Cocktail'
import SearchAll from './SearchAll'
import Ingredients from './Ingredients'

const Home = ({ navigation }) => {
  return(
    <View>
      <TouchableHighlight 
        onPress={() => navigation.navigate('SearchAll')}
        activeOpacity={0.5}
        underlayColor={'transparent'}
      >
        <Text>Search All Drinks</Text>
      </TouchableHighlight>

      <TouchableHighlight 
        onPress={() => navigation.navigate('Cocktails')}
        activeOpacity={0.5}
        underlayColor={'transparent'}
      >
        <Text>Popular Cocktails</Text>
      </TouchableHighlight>

      <TouchableHighlight 
        onPress={() => navigation.navigate('Ingredients')}
        activeOpacity={0.5}
        underlayColor={'transparent'}
      >
        <Text>Search By Ingredients</Text>
      </TouchableHighlight>

      <TouchableHighlight 
        onPress={() => navigation.navigate('Cocktail', { random: true })}
        activeOpacity={0.5}
        underlayColor={'transparent'}
      >
        <Text>Random Cocktail</Text>
      </TouchableHighlight>
    </View>
  )
}

const RootStack = createStackNavigator(
    {
      Home: Home,
      Cocktail: Cocktail,
      Cocktails: Cocktails,
      SearchAll: SearchAll,
      Ingredients: Ingredients
    },
    {
      initialRouteName: 'Home',
    }
  );

const BottomNavigator = createBottomTabNavigator({
    Home: RootStack,
    Ingredients: Ingredients,
    Cocktails: Cocktails,
    SearchAll: SearchAll,
})

const AppContainer = createAppContainer(BottomNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}