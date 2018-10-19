import React, { Component } from 'react'
import { Text, Alert, TextInput } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { startGame, endGame } from '../actions'

const Container = styled.View`
	display: flex;
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`

const IDWrapper = styled.View`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	justify-content: center;
`

const IDLabel = styled.Text``

const IDField = styled.Text`
	text-align: center;
	width: 200;
	border: 1px grey solid;
	padding: 5px;
	border-radius: 5;
	margin-top: 5;
`

const PlayerList = styled.FlatList`
	margin-top: 5;
	flex: 1;
`

const InviteButton = styled.Button``

const Player = styled.Text`
	text-align: center;
	width: 200;
	border: 1px grey solid;
	padding: 5px;
	border-radius: 5;
`

class HomeScreen extends Component {
	state = {
		players: [],
		opponent: ''
	}

	componentDidMount() {
		this.props.socket.emit('info')

		this.props.socket.on('start-game', () => {
			this.props.navigation.navigate('Game')
		})

		this.props.socket.on('info', data => {
			this.setState({
				players: data.players.filter(player => player !== this.props.socket.id)
			})
		})

		this.props.socket.on('invitation', (room, callback) => {
			Alert.alert(
				'Received an invitation!',
				'',
				[
					{
						text: 'Accept',
						onPress: () => this.acceptInvite(room, callback(true))
					},
					{
						text: 'Decline',
						onPress: () => this.declineInvite(room, callback(false))
					}
				],
				{ cancelable: false }
			)
		})
	}

	componentWillUnmount() {
		this.props.socket.off('start-game')
		this.props.socket.off('info')
		this.props.socket.off('invitation')
	}

	invite = () => {
		if (this.props.playing) return Alert.alert('You are already in game')
		this.props.startGame(this.props.socket.id)
		this.props.socket.emit(
			'invitation',
			this.state.opponent,
			res => (res ? this.handleAcceptedInvite() : this.handleDeclinedInvite())
		)
	}

	handleAcceptedInvite = () => Alert.alert('Invite accepted')

	handleDeclinedInvite = () => Alert.alert('Invite declined')

	acceptInvite = room => this.props.startGame(room)

	declineInvite = room => this.props.endGame(room)

	render() {
		return (
			<Container>
				<IDWrapper>
					<IDLabel>My ID:</IDLabel>
					<IDField>{this.props.socket.id}</IDField>
				</IDWrapper>
				<Text>Players:</Text>
				<PlayerList
					data={this.state.players}
					renderItem={({ item }) => (
						<Player onPress={() => this.setState({ opponent: item })}>
							{item}
						</Player>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
				<TextInput onChangeText={opponent => this.setState({ opponent })}>
					{this.state.opponent}
				</TextInput>
				<InviteButton title="Invite" onPress={() => this.invite()} />
			</Container>
		)
	}
}

export default connect(
	state => ({ socket: state.socket, playing: state.playing }),
	dispatch => ({
		startGame: room => dispatch(startGame(room)),
		endGame: () => dispatch(endGame())
	})
)(HomeScreen)
