import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'

import App from './bootstrap/App'
import registerServiceWorker from './bootstrap/registerServiceWorker'
import {BACKGROUND_COLOR, TEXT_COLOR, LINK_COLOR} from './common/styles/colors'
import {FontFamily, FontSize} from './common/styles/fonts'
import './assets/fonts/futura.css'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    background-color: ${BACKGROUND_COLOR};
    font-family: ${FontFamily.PRIMARY};
    font-size: ${FontSize.Mobile.SMALL};
    color: ${TEXT_COLOR};
    margin: 0;
  }

  a {
    color: ${LINK_COLOR};
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: #d20074;
    }
  }

  p {
    margin-top: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  #root {
    display: flex;
    height: 100%;
  }
`
