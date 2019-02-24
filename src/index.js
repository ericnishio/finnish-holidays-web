import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './bootstrap/Routes'
import registerServiceWorker from './bootstrap/registerServiceWorker'
import './assets/fonts/futura.css'

ReactDOM.render(<Routes />, document.getElementById('root'))

registerServiceWorker()
