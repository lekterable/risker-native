import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
		initialRouteName: 'Home',
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state
				let iconName
				if (routeName === 'Home') {
					iconName = `ios-home${focused ? '' : '-outline'}`
				} else if (routeName === 'Game') {
					iconName = `ios-game-controller-b${focused ? '' : '-outline'}`
				} else if (routeName === 'Ranking') {
					iconName = `ios-people${focused ? '' : '-outline'}`
				}

				return (
					<Ionicons
						name={iconName}
						size={horizontal ? 20 : 25}
						color={tintColor}
					/>
				)
			}
		}),
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray'
		}
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
