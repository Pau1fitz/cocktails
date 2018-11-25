import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import styled from 'styled-components/native'
import Cocktails from './Cocktails'
import Cocktail from './Cocktail'
import SearchAll from './SearchAll'
import Ingredients from './Ingredients'

const Home = ({ navigation }) => {
  return(
    <MainContainer>
    
      <CocktailHeader>Cocktail Chef</CocktailHeader>
      
      <LogoImage source={require('./cocktail.png')}/>

      <View>
        <CocktailContainer>
          <TouchableHighlight 
            onPress={() => navigation.navigate('SearchAll')}
            activeOpacity={0.5}
            underlayColor={'transparent'}
          >
            <CocktailText>Search All Drinks</CocktailText>
          </TouchableHighlight>
        </CocktailContainer>

        <CocktailContainer>
          <TouchableHighlight 
            onPress={() => navigation.navigate('Cocktails')}
            activeOpacity={0.5}
            underlayColor={'transparent'}
          >
            <CocktailText>Popular Cocktails</CocktailText>
          </TouchableHighlight>
        </CocktailContainer>

        <CocktailContainer>
          <TouchableHighlight 
            onPress={() => navigation.navigate('Ingredients')}
            activeOpacity={0.5}
            underlayColor={'transparent'}
          >
            <CocktailText>Search By Ingredients</CocktailText>
          </TouchableHighlight>
        </CocktailContainer>

        <CocktailContainer>
          <TouchableHighlight 
            onPress={() => navigation.navigate('Cocktail', { random: true })}
            activeOpacity={0.5}
            underlayColor={'transparent'}
          >
            <CocktailText>Random Cocktail</CocktailText>
          </TouchableHighlight>
        </CocktailContainer>
      </View>
    </MainContainer>
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

const BottomNavigator = createBottomTabNavigator(
  {
    Home: RootStack,
    Ingredients: Ingredients,
    Cocktails: Cocktails,
    SearchAll: SearchAll,
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgb(25, 25, 65)',
      labelStyle: {
        fontSize: 14,
      },
      style: {

      },
    }
  }
)

const AppContainer = createAppContainer(BottomNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

const MainContainer = styled.View`
  display: flex;
  flex: 1;
  margin: 0 10px;
  justify-content: center;
`

const LogoImage = styled.Image`
  height: 200px;
  width: 200px;
  align-self: center;
`

const CocktailHeader = styled.Text`
  color: rgb(25, 25, 65);
  font-size: 32px;
  font-weight: 800;
  font-family: Avenir;
  align-self: center;
  padding: 10px 0 0 0;
`

const CocktailText = styled.Text`
  color: rgb(25, 25, 65);
  font-family: Avenir;
  font-size: 16px;
  font-weight: 800;
`

const CocktailContainer = styled.View`
  display: flex; 
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #DDDEE6;
  padding: 20px 0;
`
