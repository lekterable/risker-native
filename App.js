import React from 'react'
import { Provider } from 'react-redux'
import Root from './src/navigators'
import store from './src/store'

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default App
