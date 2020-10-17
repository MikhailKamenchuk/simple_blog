// import '../styles  /globals.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import type { AppProps /* , AppContext */ } from 'next/app'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  *{
    box-sizing: border-box;
  }
  
  a{
    color: inherit;
    text-decoration: none;
  }
`
const theme = {
  colors: {
    primary: '#0070f3',
    white: '#ffffff',
    gray: '#eaeaea',
    darkGrey: '#9e9e9e',
    red: '#ff0000'
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
              <Component {...pageProps} />
          </ThemeProvider>
      </>
  )
}

export default MyApp
