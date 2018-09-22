export default (state = { socket: {} }, action) => {
	switch (action.type) {
		case 'CONNECT_SOCKET':
			return { ...state, socket: action.payload }
		default:
			return state
	}
}
