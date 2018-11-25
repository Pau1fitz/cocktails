import React, { Component } from 'react'
import {
  Text, 
  View, 
  ScrollView, 
  Image, 
  FlatList,
  TextInput,
  TouchableHighlight
} from 'react-native'
import styled from 'styled-components/native'

export default class Ingredients extends Component  {

  static navigationOptions = {
    headerTintColor: 'rgb(25, 25, 65)',
    headerStyle: {

    }
  };

  state = {
    ingredients: [],
    filteredList: null
  }

  async componentDidMount() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
    const res = await fetch(URL)
    const json = await res.json()
    let ingredients = json.drinks
    this.setState({
      ingredients
    })
  }

  filterList = (text) => {
    const filteredList = this.state.ingredients.filter(ingredient => {
      return ingredient.strIngredient1.toLowerCase().includes(text.toLowerCase())
    })

    this.setState({
      filteredList
    })
  }

  render() {

    const { ingredients, filteredList } = this.state

    return (
      <MainContainer>
        <CocktailHeaderContainer>
          <CocktailHeader>Ingredients</CocktailHeader>
        </CocktailHeaderContainer>

        <Input
          style={{height: 40}}
          placeholder='Search for an ingredient...'
          onChangeText={(text) => this.filterList(text)}
        />

        {filteredList && filteredList.length === 0 && (
          <CenteredText>No results</CenteredText>
        )}

        <FlatList
          data={filteredList ? filteredList : ingredients}
          keyExtractor={item => item.strIngredient1}
          renderItem={({item}) => (
            <TouchableHighlight 
              onPress={() => this.props.navigation.navigate('Cocktails', { 
                ingredient: item.strIngredient1,
              })}
              activeOpacity={0.5}
              underlayColor={'transparent'}
            >               
              <CocktailContainer>
                <CocktailText>{item.strIngredient1}</CocktailText>
              </CocktailContainer>
            </TouchableHighlight>
            )
          }
        />
      </MainContainer>
    );
  }
}

const MainContainer = styled.ScrollView`
  display: flex;
  flex: 1;
  margin: 0 10px;
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
  border-color: #4E65F6;
  border-width: 2px;
`
