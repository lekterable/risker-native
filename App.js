import React, { Component } from 'react'
import { Text, Button } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import styled from 'styled-components'
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'

const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Game: GameScreen
	},
	{
		initialRouteName: 'Home'
	}
)

export default class App extends Component {
	render() {
		return <TabNavigator />
	}
}
