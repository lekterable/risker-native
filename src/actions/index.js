export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'

export const connectSocket = socket => ({
  type: CONNECT_SOCKET,
  payload: socket
})
export const startGame = room => ({ type: START_GAME, payload: room })
export const endGame = () => ({ type: END_GAME })
