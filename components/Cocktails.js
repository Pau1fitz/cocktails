import React, { Component } from 'react'
import {
  Text, 
  View, 
  ScrollView, 
  FlatList,
  Image, 
  TextInput,
  TouchableHighlight
} from 'react-native'
import styled from 'styled-components/native'
import LoadingIndicator from './LoadingIndicator'

export default class Cocktails extends Component  {

  static navigationOptions = {
    headerTintColor: 'rgb(25, 25, 65)'
  }

  state = {
    cocktails: [],
    filteredList: null
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const ingredient = navigation.getParam('ingredient', null);
    const URL = ingredient ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}` : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
    const res = await fetch(URL)
    const json = await res.json()
    let cocktails = json.drinks
    this.setState({
      cocktails
    })
  }

  filterList = (text) => {
    const filteredList = this.state.cocktails.filter(cocktail => {
      return cocktail.strDrink.toLowerCase().includes(text.toLowerCase())
    })

    this.setState({
      filteredList
    })
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