import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "../reslovers";
import { GraphQLSchema, graphql } from "graphql";
import { gql } from "apollo-server-core";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Context from "../interface/context";
import { request } from "https";
import { response } from "express";
let schema: GraphQLSchema;
let mongoServer: MongoMemoryServer;


export const connect = async()=>{
   mongoServer = await MongoMemoryServer.create();
   let mongoUri = mongoServer.getUri();

  
  await mongoose.connect(mongoUri);

}


export const discconect = async (mongoServer: MongoMemoryServer)=>{
     await mongoose.disconnect();
     await mongoServer.stop() ;
}
 


