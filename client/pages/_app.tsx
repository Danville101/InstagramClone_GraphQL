import '../styles/globals.css'

import PageProvider from './context/AuthContext'


export default function App({
  
  Component,
  pageProps: { ...pageProps },

}) {


  return (


 <PageProvider >
      <Component {...pageProps} />  
  </PageProvider>    


  )
}

