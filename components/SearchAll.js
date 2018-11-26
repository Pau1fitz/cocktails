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

export default class SearchAll extends Component  {

  static navigationOptions = {
    headerTintColor: 'rgb(25, 25, 65)'
  }

  state = {
    results: [],
  }

  async componentDidMount() {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
    const res = await fetch(URL)
    const json = await res.json()
    let results = json.drinks
    this.setState({
      results
    })
  }

  async updateSearch (text) {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`
    fetch(URL).then(res => {
      return res.json()
    }).then(json => {
      let results = json.drinks
      this.setState({
        results
      })
    })
  }

  render() {

    const { results } = this.state

    return (
      <MainContainer>
  
        <CocktailHeaderContainer>
          <CocktailHeader>Search All</CocktailHeader>
        </CocktailHeaderContainer>

        <Input
          style={{height: 40}}
          placeholder='Search for a cocktail...'
          onChangeText={(text) => this.updateSearch(text)}
        />

        {results == null && (
          <CenteredText>No results</CenteredText>
        )}
        <FlatList
          data={results}
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
  border-color: rgb(25, 25, 65);
  border-width: 2px;
`
