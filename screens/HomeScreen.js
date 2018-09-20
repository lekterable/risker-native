import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

const Container = styled.View`
	display: flex;
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`

export default class HomeScreen extends React.Component {
	render() {
		return (
			<Container>
				<Text>Home</Text>
			</Container>
		)
	}
}
