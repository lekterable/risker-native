import React from 'react'
import { Text, Button } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.View`
	display: flex;
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`

class HomeScreen extends React.Component {
	render() {
		const { value, increase, decrease } = this.props
		return (
			<Container>
				<Text>Home</Text>
			</Container>
		)
	}
}

export default connect(
	state => ({}),
	dispatch => ({})
)(HomeScreen)
