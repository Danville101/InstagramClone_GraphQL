import "reflect-metadata";
import dotenv from "dotenv"
import express, { NextFunction, Request, Response, request } from 'express'
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import mongoose from "mongoose"
import {resolvers} from "./reslovers"
import "reflect-metadata";
import morgan from "morgan";
import { WebSocketServer, } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import {createServer} from "http";
import { PubSub } from "graphql-subscriptions";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import authChecker from './utils/authChecker'
import Context from "./interface/context";
import { verifyJWT } from "./utils/jwt";

import cookieParser from "cookie-parser";

import { User } from "./model/user.schema";

import cors, { CorsOptions } from 'cors';
import profilePicRoute from "./routes/profilePic"
import authRoute from "./routes/auth"
import createPostRoute from "./routes/createPost"
import messageImageRoute from "./routes/messageImage"

import { Context as subContext } from "graphql-ws";
import console from "console";
import process from "process";

import RestContext from "./contextClass";
  dotenv.config();





(async()=>{


  const setCustomHeaderMiddleware = (req : Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"),
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    res.header("Access-Control-Allow-Credentials", "true")
    next(); // Pass control to the next middleware or route handler
  };

     
 

   //  const pubSub= new PubSub()
     
      

     const app= express()
       app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true,
      
    }));

    app.use(setCustomHeaderMiddleware)
       app.use(express.static('public'))

       app.use(express.json())

 app.use(morgan("dev"))
     app.use(cookieParser());

     const httpServer = createServer(app);
     const PORT:number = 4040


     app.use((req: Request, res: any, next: any) => {
      RestContext.bind(req);
      next();
    });


    app.use((req, res, next) => {  
      if(req.cookies.acceesToken){
       const user = verifyJWT<User>(req.cookies.acceesToken)
       res.locals.currentUser = user._id
     }  
 
 
       next();
     });
 
 

     app.use("",profilePicRoute)
     app.use("",authRoute)
     app.use("",createPostRoute)
     app.use("",messageImageRoute)
     

     try {
          mongoose.connect(`${process.env.MONGO_URI}`,()=>console.log("🗄 Connected to DB"))
     } catch (error) {
          console.log(error)
     }


     


     const schema = await buildSchema({
          resolvers,
          authChecker,
     });



     // WebSocket
     const wsServer = new WebSocketServer({

          server: httpServer,
          
          path: "/graphql",
        

     });

 
    



    const severCleanUp= useServer(
      {
        schema,
      },
      wsServer,
    );

  

  
    
     // WebSocket



     function authenticate(req:Request, res:Response, next:NextFunction) {
      if (!req.headers.authorization) {
        res.redirect('/login'); // Redirect to the login page
      } else {
        // Validate the authentication token or perform any necessary checks
        // If authentication is successful, call `next()` to proceed to the next middleware or resolver
        next();
      }
    }



     const server = new ApolloServer({
          schema,
          context:(ctx:Context,)=>{

            const context = ctx;
            ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000"),
              ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
              ctx.res.header("Access-Control-Allow-Credentials", "true")
            if(ctx.req.cookies.acceesToken){
              const user = verifyJWT<User>(ctx.req.cookies.acceesToken)
              context.user = user?._id
            }  

            

            console.log(context.user)
        
           return context

          

          },
          plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),
               ApolloServerPluginDrainHttpServer({ httpServer })
               ,
               {
                    async serverWillStart() {
                      return {
                        async drainServer() {
                          await severCleanUp.dispose();
                        }
                      };
                    }
                  }
          ]
     })

     await server.start()
    server.applyMiddleware({ app })
    

   wsServer.on('connection', () => {
      console.log('WebSocket connected with cookies:');
    });



          httpServer.listen(PORT, () => {
               console.log(
                 `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
               );
               console.log(
                 `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
               );
             });
})()