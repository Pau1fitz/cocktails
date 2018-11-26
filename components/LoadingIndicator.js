import React, { Component } from 'react'
import {
  ActivityIndicator,
  View
} from 'react-native'
import styled from 'styled-components'

export default () =>  (
  <LoadingIndicatorContainer>
    <ActivityIndicator />
  </LoadingIndicatorContainer>
)

const LoadingIndicatorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`