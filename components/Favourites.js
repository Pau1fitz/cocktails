import React, { Component } from 'react'
import {
  Text, 
  View, 
  ScrollView, 
  FlatList,
  Image, 
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native'

import Swipeout from 'react-native-swipeout';

import styled from 'styled-components/native'
import LoadingIndicator from './LoadingIndicator'

export default class Favourites extends Component  {

  static navigationOptions = {
    headerTintColor: 'rgb(25, 25, 65)'
  }

  state = {
    cocktails: [],
    filteredList: null
  }

  componentDidMount() {
    this._retrieveData();
  }


  _retrieveData = async () => {

    try {
      const value = await AsyncStorage.getItem('cocktails');
      if (value !== null) {
        this.setState({
          cocktails: JSON.parse(value)
        })
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  

  filterList = (text) => {
    const filteredList = this.state.cocktails.filter(cocktail => {
      return cocktail.strDrink.toLowerCase().includes(text.toLowerCase())
    })

    this.setState({
      filteredList
    })
  }

  removeItem = async (item) => {
    let cocktails = this.state.cocktails
    cocktails = cocktails.filter(cocktail => {
      return cocktail.idDrink !== item.idDrink
    })
    this.setState({
      cocktails
    })

    try {
      await AsyncStorage.setItem('cocktails', JSON.stringify(cocktails));
    } catch (error) {
      // catch
    }
  }

  render() {
    const { cocktails, filteredList } = this.state

    return (
      <CocktailHolderContainer>
        {
          cocktails.length === 0 ? (
              <LoadingIndicator />
          ) : (
            <MainContainer>
              <CocktailHeaderContainer>
                <CocktailHeader>Cocktails</CocktailHeader>
              </CocktailHeaderContainer>
              <Input
                style={{height: 40}}
                placeholder='Search for a cocktail...'
                onChangeText={(text) => this.filterList(text)}
              />
              {filteredList && filteredList.length === 0 && (
                <CenteredText>No results</CenteredText>
              )}
    
              <FlatList
                data={filteredList ? filteredList : cocktails}
                keyExtractor={item => item.idDrink}
                renderItem={({item}) => (
                  <Swipeout 
                    right={[
                      {
                        text: 'Delete',
                        backgroundColor: 'red',
                        onPress:  () => {this.removeItem(item)}
                      }
                    ]}
                    backgroundColor={'transparent'}
                  >
                    <View>
                    <TouchableHighlight 
                      onPress={() => this.props.navigation.navigate('Cocktail', { id: item.idDrink })}
                      activeOpacity={0.5}
                      underlayColor={'transparent'}
                    >               
                      <CocktailContainer>
                        <CocktailText>{item.strDrink}</CocktailText>
                        <CocktailImage source={{uri: item.strDrinkThumb}} />  
                      </CocktailContainer>
                    </TouchableHighlight>
                    </View>
                  </Swipeout>
                  )
                }
              />
            </MainContainer>
          )
        }
      </CocktailHolderContainer>
    );
  }
}

const MainContainer = styled.ScrollView`
  display: flex;
  flex: 1;
  margin: 0 10px;
`

const CocktailHolderContainer = styled.View`
  display: flex;
  flex: 1;
`

const CocktailHeaderContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #DDDEE6;
  padding: 10px 0;
`

const Input = styled.TextInput`
  color: rgb(25, 25, 65);
  font-family: Avenir;
  font-size: 16px;
  font-weight: 800;
`

const CenteredText = styled.Text`
  align-self: center;
  font-size: 26px;
  font-weight: 800;
  font-family: Avenir;
`

const CocktailHeader = styled.Text`
  color: rgb(25, 25, 65);
  font-size: 26px;
  font-weight: 800;
  font-family: Avenir;
`

const CocktailContainer = styled.View`
  display: flex; 
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #DDDEE6;
  padding: 20px 0;
`

const CocktailText = styled.Text`
  color: rgb(25, 25, 65);
  font-family: Avenir;
  font-size: 16px;
  font-weight: 800;
`

const CocktailImage = styled.Image`
  height: 50px;
  width: 50px;
  position: absolute;
  right: 10px;
  border-radius: 25px;
  border-color: rgb(25, 25, 65);
  border-width: 2px;
`