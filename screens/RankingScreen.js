import React, { Component } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

export default class GameScreen extends Component {
  render() {
    return (
      <Container>
        <Text>Ranking</Text>
      </Container>
    )
  }
}
