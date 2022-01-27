function GlobalStyle() { //Estilo global - reset css
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 

      // ::-webkit-scrollbar {
      //   width: 1em;
      // }

      // ::-webkit-scrollbar-track {
      //   boxShadow: inset 0 0 6px rgba(0,0,0,0.00);
      //   webkitBoxShadow: inset 0 0 6px #FFFFFF;
      // }

      // ::-webkit-scrollbar-thumb {
      //   backgroundColor: rgba(0,0,0,0.1);
      //   outline: 1px solid slategrey;
      // }

    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) { //Aplica em todas as páginas - Recurso do Next
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    )
}