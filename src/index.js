import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { createApp } from './createApp'

const node = document.getElementById('root')
const App = createApp()

ReactDOM.render(createElement(App), node)
