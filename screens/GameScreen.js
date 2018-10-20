import React, { Component } from 'react'
import { Text, Button, Alert, View } from 'react-native'
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
	}

	roll = () => this.props.socket.emit('turn-roll')

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
						onPress={() => console.log('End')}
						disabled={this.props.socket.id !== this.state.turn}
					/>
				</View>
			</Container>
		)
	}
}

export default connect(
	state => ({ playing: state.playing, socket: state.socket }),
	dispatch => ({})
)(GameScreen)
