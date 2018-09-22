import React from 'react'
import { Text, Button } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { increaseValue, decreaseValue } from '../actions'

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
				<Text>{value}</Text>
				<Button title="Increase" onPress={increase} />
				<Button title="Decrease" onPress={decrease} />
			</Container>
		)
	}
}

export default connect(
	state => ({ value: state.value }),
	dispatch => ({
		increase: () => dispatch(increaseValue()),
		decrease: () => dispatch(decreaseValue())
	})
)(HomeScreen)
