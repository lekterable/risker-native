export default (state = { socket: {} }, action) => {
  switch (action.type) {
    case 'CONNECT_SOCKET':
      return { ...state, socket: action.payload }
    case 'START_GAME':
      return { ...state, room: action.payload, playing: true }
    case 'END_GAME':
      return { ...state, room: '', playing: false }
    default:
      return state
  }
}
