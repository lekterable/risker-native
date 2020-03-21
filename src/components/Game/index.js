import React, { useEffect, useState } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { endGame } from '../../actions'
import * as Styled from './styled'

const Game = ({ navigation, socket, playing, endGame }) => {
  const [state, setState] = useState({
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
  })

  useEffect(() => {
    const focusListener = navigation.addListener('willFocus', () => {
      if (!playing) {
        Alert.alert('You are not in any game')
        return navigation.navigate('Home')
      }
    })

    socket.emit('ready', game => {
      if (!game && playing) {
        endGame()
        Alert.alert('Game has ended!')
      }
      if (!game) return navigation.navigate('Home')

      const player = game.players.find(player => player.id === socket.id)
      const opponent = game.players.find(player => player.id !== socket.id)
      setState({
        turn: game.turn,
        host: game.host,
        player: { ...player },
        opponent: { ...opponent }
      })
    })

    socket.on('update', game => {
      const player = game.players.find(player => player.id === socket.id)
      const opponent = game.players.find(player => player.id !== socket.id)
      setState({
        turn: game.turn,
        host: game.host,
        player: { ...player },
        opponent: { ...opponent }
      })
    })

    socket.on('win', game => {
      const player = game.players.find(player => player.id === socket.id)
      const opponent = game.players.find(player => player.id !== socket.id)
      setState({
        turn: game.turn,
        host: game.host,
        player: { ...player },
        opponent: { ...opponent }
      })

      if (game.turn === socket.id) Alert.alert('You win!')
      else Alert.alert('You lose!')

      endGame()
      navigation.navigate('Home')
    })

    return () => {
      socket.off('update')
      socket.off('win')
      focusListener.remove()
    }
  }, [])

  const isDisabled = socket.id !== state.turn

  const handleRoll = () => socket.emit('turn-roll')
  const handleEnd = () => socket.emit('turn-end')

  return (
    <Styled.Container>
      <View>
        <View>
          <Text>Opponent's total score: {state.opponent.total}</Text>
          <Text>Opponent's round score: {state.opponent.round}</Text>
          <Text>
            Opponent's roll:
            <Text>🎲</Text>
            {state.opponent.roll[0]} and
            <Text>🎲</Text>
            {state.opponent.roll[1]}
          </Text>
        </View>
        <View>
          <Text>Your total score: {state.player.total}</Text>
          <Text>Your round score: {state.player.round}</Text>
          <Text>
            Your roll:
            <Text>🎲</Text>
            {state.player.roll[0]} and
            <Text>🎲</Text>
            {state.player.roll[1]}
          </Text>
        </View>
        <Button title="Roll" onPress={handleRoll} disabled={isDisabled} />
        <Button title="End" onPress={handleEnd} disabled={isDisabled} />
      </View>
    </Styled.Container>
  )
}

export default connect(
  state => ({ playing: state.playing, socket: state.socket }),
  dispatch => ({ endGame: () => dispatch(endGame()) })
)(Game)
