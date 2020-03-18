import React, { Component } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { endGame } from '../actions'

const Container = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.props.navigation.addListener('willFocus', () => {
      if (!this.props.playing) {
        Alert.alert('You are not in any game')
        return this.props.navigation.navigate('Home')
      }
    })
  }

  state = {
    turn: '',
    host: '',
    player: {
      total: 0,
      round: 0,
      roll: [0, 0]
    },
    opponent: {
      total: 0,
      round: 0,
      roll: [0, 0]
    }
  }

  componentDidMount() {
    this.props.socket.emit('ready', game => {
      if (!game && this.props.playing) {
        this.props.endGame()
        Alert.alert('Game has ended!')
      }
      if (!game) {
        return this.props.navigation.navigate('Home')
      }
      const player = game.players.find(
        player => player.id === this.props.socket.id
      )
      const opponent = game.players.find(
        player => player.id !== this.props.socket.id
      )
      this.setState({
        turn: game.turn,
        host: game.host,
        player: { ...player },
        opponent: { ...opponent }
      })
    })

    this.props.socket.on('update', game => {
      const player = game.players.find(
        player => player.id === this.props.socket.id
      )
      const opponent = game.players.find(
        player => player.id !== this.props.socket.id
      )
      this.setState({
        turn: game.turn,
        host: game.host,
        player: { ...player },
        opponent: { ...opponent }
      })
    })

    this.props.socket.on('win', game => {
      const player = game.players.find(
        player => player.id === this.props.socket.id
      )
      const opponent = game.players.find(
        player => player.id !== this.props.socket.id
      )
      this.setState({
        turn: game.turn,
        host: game.host,
        player: { ...player },
        opponent: { ...opponent }
      })

      if (game.turn === this.props.socket.id) Alert.alert('You win!')
      else Alert.alert('You lose!')

      this.props.endGame()
      return this.props.navigation.navigate('Home')
    })
  }

  componentWillUnmount() {
    this.props.socket.off('update')
    this.props.socket.off('win')
  }

  roll = () => this.props.socket.emit('turn-roll')

  end = () => this.props.socket.emit('turn-end')

  render() {
    return (
      <Container>
        <View>
          <View>
            <Text>Opponent's total score: {this.state.opponent.total}</Text>
            <Text>Opponent's round score: {this.state.opponent.round}</Text>
            <Text>
              Opponent's roll:
              <Text>🎲</Text>
              {this.state.opponent.roll[0]} and
              <Text>🎲</Text>
              {this.state.opponent.roll[1]}
            </Text>
          </View>
          <View>
            <Text>Your total score: {this.state.player.total}</Text>
            <Text>Your round score: {this.state.player.round}</Text>
            <Text>
              Your roll:
              <Text>🎲</Text>
              {this.state.player.roll[0]} and
              <Text>🎲</Text>
              {this.state.player.roll[1]}
            </Text>
          </View>
          <Button
            title="Roll"
            onPress={this.roll}
            disabled={this.props.socket.id !== this.state.turn}
          />
          <Button
            title="End"
            onPress={this.end}
            disabled={this.props.socket.id !== this.state.turn}
          />
        </View>
      </Container>
    )
  }
}

export default connect(
  state => ({ playing: state.playing, socket: state.socket }),
  dispatch => ({ endGame: () => dispatch(endGame()) })
)(GameScreen)
