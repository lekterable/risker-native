import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from 'react-navigation'
import io from 'socket.io-client'
import { connectSocket } from '../actions'

import HomeScreen from './HomeScreen'
import GameScreen from './GameScreen'
import RankingScreen from './RankingScreen'

const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Game: GameScreen,
		Ranking: RankingScreen
	},
	{
		initialRouteName: 'Home'
	}
)

class Root extends Component {
	constructor(props) {
		super(props)
		this.props.connectSocket(io.connect('http://localhost:3001'))
	}
	render() {
		return <TabNavigator />
	}
}

export default connect(
	() => ({}),
	dispatch => ({
		connectSocket: socket => dispatch(connectSocket(socket))
	})
)(Root)
