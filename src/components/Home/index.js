import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native'
import { connect } from 'react-redux'
import { endGame, startGame } from '../../actions'
import * as Styled from './styled'

const Home = ({ socket, navigation, playing, startGame, endGame }) => {
  const [players, setPlayers] = useState([])
  const [opponent, setOpponent] = useState('')

  useEffect(() => {
    socket.emit('info')

    socket.on('start-game', () => {
      navigation.navigate('Game')
    })

    socket.on('info', data => {
      const newPlayers = data.players.filter(player => player !== socket.id)
      setPlayers(newPlayers)
    })

    socket.on('invitation', (room, callback) => {
      if (playing) return callback(false)
      Alert.alert(
        'Received an invitation!',
        '',
        [
          {
            text: 'Accept',
            onPress: () => acceptInvite(room, callback(true))
          },
          {
            text: 'Decline',
            onPress: () => declineInvite(room, callback(false))
          }
        ],
        { cancelable: false }
      )
    })
    return () => {
      socket.off('start-game')
      socket.off('info')
      socket.off('invitation')
    }
  }, [])

  const invite = () => {
    if (playing) return Alert.alert('You are already in game')
    startGame(socket.id)
    socket.emit('invitation', opponent, res =>
      res ? handleAcceptedInvite() : handleDeclinedInvite()
    )
  }

  const handleAcceptedInvite = () => Alert.alert('Invite accepted')
  const handleDeclinedInvite = () => Alert.alert('Invite declined')
  const acceptInvite = room => startGame(room)
  const declineInvite = room => endGame(room)

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.Label>My ID:</Styled.Label>
        <Styled.ID>{socket.id}</Styled.ID>
      </Styled.Wrapper>
      <Text>Players:</Text>
      <Styled.PlayerList
        data={players}
        renderItem={({ item }) => (
          <Styled.Player onPress={() => setOpponent(item)}>
            {item}
          </Styled.Player>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Styled.InviteInput onChangeText={opponent => setOpponent(opponent)}>
        {opponent}
      </Styled.InviteInput>
      <Styled.InviteButton
        title="Invite"
        onPress={invite}
        disabled={!opponent}
      />
    </Styled.Container>
  )
}

export default connect(
  state => ({ socket: state.socket, playing: state.playing }),
  dispatch => ({
    startGame: room => dispatch(startGame(room)),
    endGame: () => dispatch(endGame())
  })
)(Home)
