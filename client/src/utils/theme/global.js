import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  html {
    /* font-size: 62.5%; */
    box-sizing: border-box;
    --main: ${props => props.theme.colors.main};
    --whitesmoke: ${props => props.theme.colors.whitesmoke};
    --shadow: ${props => props.theme.colors.shadow};
    --smallShadow: ${props => props.theme.colors.smallShadow}
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
  a, button {
    cursor: pointer;
  }
  a, input, textarea, button {
    outline: none;
    text-decoration: none;
    font-family: inherit;
  }
`
