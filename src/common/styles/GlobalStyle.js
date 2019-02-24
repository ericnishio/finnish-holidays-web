import {createGlobalStyle} from 'styled-components'

import {BACKGROUND_COLOR, TEXT_COLOR, LINK_COLOR} from './colors'
import {FontFamily, FontSize} from './fonts'
import {DESKTOP_MIN_WIDTH} from './responsive'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    background-color: ${BACKGROUND_COLOR};
    font-family: ${FontFamily.PRIMARY};
    font-size: ${FontSize.Mobile.MEDIUM};
    color: ${TEXT_COLOR};
    margin: 0;

    @media (min-width: ${DESKTOP_MIN_WIDTH}) {
      font-size: ${FontSize.Desktop.MEDIUM};
    }
  }

  a {
    color: ${LINK_COLOR};
    text-decoration: none;
    transition: color 0.15s;

    &:hover {
      color: #fffebc;
    }

    &:any-link {
      color: ${LINK_COLOR};
      text-decoration: none;
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

export default GlobalStyle
