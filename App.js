import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Image, Platform } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import styled from 'styled-components/native'
import Cocktails from './components/Cocktails'
import Cocktail from './components/Cocktail'
import SearchAll from './components/SearchAll'
import Ingredients from './components/Ingredients'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
class Home extends Component {

  render() {
    const { navigation } = this.props
      return(
      <MainContainer>
        <View>
          <CocktailHeader>Cocktail Chef</CocktailHeader>
        </View>
        <View>
          <LogoImage source={require('./cocktail.png')}/>
        </View>
        <ScrollView>
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
        </ScrollView>
      </MainContainer>
      )
  }
}

const NavigationStack = page => createStackNavigator({
  Home: Home,
  Cocktails: Cocktails,
  Ingredients: Ingredients,
  SearchAll: SearchAll,
  Cocktail: Cocktail
}, {
  initialRouteName: page,
  headerTintColor: 'rgb(25, 25, 65)',
});

const BottomNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: NavigationStack('Home'),
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarOptions: {
          showIcon: true,
          activeTintColor: 'rgb(25, 25, 65)',
          labelStyle: {
            fontSize: 14,
          }
        },
        tabBarIcon: () => (
          <Icon name={'home'} size={18} color={'rgb(25, 25, 65)'} />
        )
      },
    },
    CocktailsTab: {
      screen: NavigationStack('Cocktails'),
      navigationOptions: {
        tabBarLabel: 'Cocktails',
        tabBarOptions: {
          showIcon: true,
          activeTintColor: 'rgb(25, 25, 65)',
          labelStyle: {
            fontSize: 14,
          }
        },
        tabBarIcon: () => (
          <Icon name={'cocktail'} size={18} color={'rgb(25, 25, 65)'} />
        )
      },
    },
    IngredientsTab: {
      screen: NavigationStack('Ingredients'),
      navigationOptions: {
        tabBarLabel: 'Ingredients',
        tabBarOptions: {
          showIcon: true,
          activeTintColor: 'rgb(25, 25, 65)',
          labelStyle: {
            fontSize: 14,
          }
        },
        tabBarIcon: () => (
          <Icon name={'wine-bottle'} size={18} color={'rgb(25, 25, 65)'} />
        )
      },
    },
    SearchAllTab: {
      screen: NavigationStack('SearchAll'),
      navigationOptions: {
        tabBarLabel: 'Search All',
        tabBarOptions: {
          showIcon: true,
          activeTintColor: 'rgb(25, 25, 65)',
          labelStyle: {
            fontSize: 14,
          }
        },
        tabBarIcon: () => (
          <Icon name={'search'} size={18} color={'rgb(25, 25, 65)'} />
        )
      },
    }
  }
)

const AppContainer = createAppContainer(BottomNavigator)

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
  padding: 10px 0 0 0;
  align-self: center;
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
