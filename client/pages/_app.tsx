import '../styles/globals.css'

import PageProvider from './context/AuthContext'

import { ApolloProvider } from '@apollo/client'
import client from '../libs/withApollo'

interface AppProps {
  Component: React.ComponentType<any>; // Define the type for the "Component" prop
  pageProps: any; // Define the type for the "pageProps" prop (you can replace "any" with a more specific type)
}




export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </ApolloProvider>
  );
}