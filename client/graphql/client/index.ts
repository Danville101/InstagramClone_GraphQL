import { ApolloClient, InMemoryCache } from "@apollo/client";
import  createUploadLink  = require('apollo-upload-client')

const client = new ApolloClient({
    uri: "http://localhost:4040/graphql",
    cache: new InMemoryCache(),

    
   
});

export default client;