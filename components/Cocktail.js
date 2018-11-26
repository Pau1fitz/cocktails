import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground
} from 'react-native'
import styled from 'styled-components/native'

export default class Cocktail extends Component  {

  static navigationOptions = {
    headerTintColor: 'rgb(25, 25, 65)'
  }

  state = {
    cocktail: {},
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('id', null);
    const random = navigation.getParam('random', null);
    const URL = random  ? 'https://www.thecocktaildb.com/api/json/v1/1/random.php' : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`
    const res = await fetch(URL)
    const json = await res.json()
    this.setState({
      cocktail: json.drinks[0]
    })
  }


  render() {
    const { cocktail } = this.state

    const instructions = cocktail && cocktail.strInstructions && cocktail.strInstructions.split('. ') || []
    let ingredients = []

    if(cocktail) {
      ingredients = Object.keys(cocktail).filter(key => {
        return key.includes('strIngredient');
      })
  
      ingredients = ingredients.map(ingredient => {
        return cocktail[ingredient]
      }).filter(item => {
        return item != ''
      })
    }
    return (
      <CocktailContainer>
          <CocktailHeader>{cocktail.strDrink}</CocktailHeader>
          <CocktailImage source={{uri: cocktail.strDrinkThumb}} />
          <HeaderUnderlineView>
            <CocktailSubheader>Glass</CocktailSubheader>
          </HeaderUnderlineView>
          <CocktailText>{cocktail.strGlass}</CocktailText>
          <HeaderUnderlineView>
            <CocktailSubheader>Instructions</CocktailSubheader>
          </HeaderUnderlineView>
          {
            instructions.map((instruction, index) => (
              <CocktailText key={index}>{instruction.replace(/\./g,'')}.</CocktailText>
            ))
          }
         <HeaderUnderlineView>
          <CocktailSubheader>Ingredients</CocktailSubheader>
         </HeaderUnderlineView>
          {
            ingredients.map((ingredient, index) => (
              <UnderlineView key={index}>
                <CocktailText>{ingredient} <SmallCocktailText>{cocktail[`strMeasure${index + 1}`]}</SmallCocktailText></CocktailText>
              </UnderlineView>
            
            ))
          }
      </CocktailContainer>
    );
  }
}

const CocktailContainer = styled.View`
  display: flex;
  flex: 1;
  margin: 0 10px;
`

const HeaderUnderlineView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: rgb(25, 25, 65);
  margin-bottom: 10px;
`

const UnderlineView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #DDDEE6;
`

const CocktailHeader = styled.Text`
  color: rgb(25, 25, 65);
  font-size: 22px;
  font-weight: 800;
  font-family: Avenir;
  align-self: center;
  padding: 10px 0 0 0;
`

const CocktailSubheader = styled.Text`
  color: rgb(25, 25, 65);
  font-size: 18px;
  font-weight: 800;
  font-family: Avenir;
  padding: 10px 0 0 0;
`

const CocktailText = styled.Text`
  color: rgb(25, 25, 65);
  font-family: Avenir;
  font-size: 16px;
  font-weight: 800;
`

const SmallCocktailText = styled.Text`
  color: rgb(25, 25, 65);
  font-family: Avenir;
  font-size: 14px;
  font-weight: 600;
`

const CocktailImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  border-color: rgb(25, 25, 65);
  border-width: 2px;
  align-self: center;
`

