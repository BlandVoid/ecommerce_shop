import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import reportWebVitals from './reportWebVitals'

import { history } from './utils/history'

import { store } from './store'

import './index.scss'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
