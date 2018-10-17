import React, { Component } from 'react'
import { Text, Button, Alert } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {} from '../actions'

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
		if (!this.props.playing) {
			Alert.alert('You are not in any game')
			return this.props.navigation.navigate('Home')
		}
	}
	componentDidMount() {
		this.props.socket.emit('ready', game => {
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

	render() {
		return (
			<Container>
				<Text>Game</Text>
			</Container>
		)
	}
}

export default connect(
	state => ({ playing: state.playing, socket: state.socket }),
	dispatch => ({})
)(GameScreen)
