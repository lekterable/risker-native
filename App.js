import React, { Component } from 'react'
import { Text, Button } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import store from './store'
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import RankingScreen from './screens/RankingScreen'

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

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<TabNavigator />
			</Provider>
		)
	}
}
