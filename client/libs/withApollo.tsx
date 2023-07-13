import {
     ApolloClient,
     ApolloProvider,
     DefaultOptions,
     HttpLink,
     InMemoryCache,
     split
   } from "@apollo/client";
   import { useRouter } from "next/router";
   import nextWithApollo from "next-with-apollo";


   import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import Cookies from 'js-cookie'

import { getMainDefinition } from '@apollo/client/utilities';
const cook = Cookies.get("messageToken") 

let token = cook?.split(":")



const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
                createClient({
                    url: "ws://localhost:4040/graphql",
                    
                 
                })
          )
        : null;

const httpLink = new HttpLink({
    uri: "http://localhost:4040/graphql",
    credentials:"include", 
    fetch,

    

    
  
    
});

const splitLink =
    typeof window !== "undefined" && wsLink != null
        ? split(
                ({ query }) => {
                    const def = getMainDefinition(query);
                    return (
                        def.kind === "OperationDefinition" &&
                        def.operation === "subscription"
                    );
                },
                wsLink,
                httpLink,
            
          )
        : httpLink;



        const client = new ApolloClient({

          link: splitLink,
        
          cache: new InMemoryCache(),
          ssrMode: typeof window === "undefined",
          


          
        
        });
        
   
//  const withApollo = nextWithApollo(
//    ({ initialState, headers }) => {
//      return new ApolloClient({
//       
//        ssrMode: typeof window === "undefined",
//         
//        link: splitLink  ,
//   
//        headers: {
//         
//          ...(headers as Record<string, string>),
//        },
//        cache: new InMemoryCache().restore(initialState || {}),
//      });
//    },
//    {
//      render: ({ Page, props }) => {
//        const router = useRouter(); 
//      //  router.push("/")
//        return (
//  
//          <ApolloProvider client={props.apollo}>
//            <Page {...props} {...router} />
//          </ApolloProvider>
//
//        );
//      },
//    }
//  );
   
   export default client;