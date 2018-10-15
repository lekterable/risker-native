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
		const { increase, decrease } = this.props
		return (
			<Container>
				<Text>Game</Text>
			</Container>
		)
	}
}

export default connect(
	state => ({ playing: state.playing }),
	dispatch => ({})
)(GameScreen)
