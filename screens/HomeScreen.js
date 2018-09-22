import React from 'react'
import { Text, Button, TextInput } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.View`
	display: flex;
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`

const IDWrapper = styled.View`
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	justify-content: center;
`

const IDLabel = styled.Text``

const IDField = styled.Text`
	text-align: center;
	width: 200;
	border: 1px grey solid;
	padding: 5px;
	border-radius: 5;
	margin-top: 5;
`

const PlayerList = styled.FlatList`
	margin-top: 5;
	flex: 1;
`

const InviteButton = styled.Button``

const Player = styled.Text`
	text-align: center;
	width: 200;
	border: 1px grey solid;
	padding: 5px;
	border-radius: 5;
`

class HomeScreen extends React.Component {
	state = {
		players: [],
		opponent: ''
	}

	componentDidMount() {
		this.props.socket.emit('info')

		this.props.socket.on('info', data => {
			this.setState({
				players: data.players.filter(player => player !== this.props.socket.id)
			})
		})
	}
	render() {
		return (
			<Container>
				<IDWrapper>
					<IDLabel>My ID:</IDLabel>
					<IDField>{this.props.socket.id}</IDField>
				</IDWrapper>
				<Text>Players:</Text>
				<PlayerList
					data={this.state.players}
					renderItem={({ item }) => (
						<Player onPress={() => this.setState({ opponent: item })}>
							{item}
						</Player>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
				<TextInput onChangeText={opponent => this.setState({ opponent })}>
					{this.state.opponent}
				</TextInput>
				<InviteButton
					title="Invite"
					onPress={() => console.log(this.state.opponent)}
				/>
			</Container>
		)
	}
}

export default connect(
	state => ({ socket: state.socket }),
	dispatch => ({})
)(HomeScreen)
