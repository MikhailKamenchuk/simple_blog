import { createGlobalStyle, ThemeProvider } from 'styled-components'
import React from "react"
import App, { AppInitialProps, AppContext } from "next/app";
import wrapper from "../redux/store";

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

class WrappedApp extends App<AppInitialProps> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    ctx.store.dispatch({ type: "APP", payload: "was set in _app" });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname
      }
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
  }
}

export default wrapper.withRedux(WrappedApp);

