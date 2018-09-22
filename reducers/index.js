export default (state = { value: 0 }, action) => {
	switch (action.type) {
		case 'INC_VALUE':
			return { ...state, value: state.value + 1 }
		case 'DEC_VALUE':
			return { ...state, value: state.value - 1 }
		default:
			return state
	}
}
