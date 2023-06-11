import "reflect-metadata";
import dotenv from "dotenv"
import express, { NextFunction, Request, Response, request } from 'express'

import "reflect-metadata";
import morgan from "morgan";

import {createServer} from "http";

import { verifyJWT } from "../utils/jwt";

import cookieParser from "cookie-parser";

import { User } from "../model/user.schema";

import cors, { CorsOptions } from 'cors';
import profilePicRoute from "../routes/profilePic"
import authRoute from "../routes/auth"
import createPostRoute from "../routes/createPost"
import messageImageRoute from "../routes/messageImage"


import RestContext from "../contextClass";
  dotenv.config();







  const setCustomHeaderMiddleware = (req : Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"),
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    res.header("Access-Control-Allow-Credentials", "true")
    next(); // Pass control to the next middleware or route handler
  };

     
 

   //  const pubSub= new PubSub()
     
      

    export  const app= express()
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
     