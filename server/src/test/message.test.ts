import request from 'supertest';
import { GraphQLSchema, graphql } from "graphql";
import path from 'path';
//import { createPost } from './yourRouteHandler';
import { app } from '../utils/rotuesServer';
import mongoose from 'mongoose';
import { buildSchema } from "type-graphql";
import { resolvers } from "../reslovers";
import { ExecutionResult } from 'graphql';

import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';

const req = {
  body: { text: 'Test post' },
  file: {
    originalname: 'test.jpg',
    buffer: Buffer.from('test image data')
  }
};



let mongoServer: MongoMemoryServer;
let schema: GraphQLSchema;
let login: any;
let login2: any;
let user1 :any
let user2 :any


beforeEach( async ()=>{
 
     schema = await buildSchema({
          resolvers,
          validate: true,
        });
      

   mongoServer = await MongoMemoryServer.create();
   let mongoUri = mongoServer.getUri();

  
  await mongoose.connect(mongoUri, {


  });


  const mutation1  = `mutation {
    create(input: {
      userName:"swag",
      email: "swag_boy@gma400.com",
      password: "126",
      password2:"126",
      dateOfBirth:"1995-October-24"
    }) {
      _id,
      userName,
      email,
      followers,
      following,
      userName

    
    }
  }`

  user1 = await graphql({ schema, source: mutation1});

  const loginMuttion = `mutation {
    login(input:{
      userName_Email:"swag",
      password:"126"
    })
}`

const ctx={
  res: {
    header: jest.fn(),
    cookie: jest.fn()
  },
}

   login = await graphql({ schema, source: loginMuttion, contextValue:ctx});

  const mutation2  = `mutation {
    create(input: {
      userName:"swag2",
      email: "swag_boy@gma4002.com",
      password: "1262",
      password2:"1262",
      dateOfBirth:"1995-October-22"
    }) {
      _id,
      userName,
      email,
      followers,
      following,
      userName

    
    }
  }`

user2 = await graphql({ schema, source: mutation2});

  const loginMuttion2 = `mutation {
    login(input:{
      userName_Email:"swag",
      password:"126"
    })
}`

const ctx2={
  res: {
    header: jest.fn(),
    cookie: jest.fn()
  },
}

   login2 = await graphql({ schema, source: loginMuttion2, contextValue:ctx2});



})


afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop() ;
 
  
});



// Test the route handler function
describe('Send Message', () => {
  it('should create a new post', async () => {
     
     const text ="joke"

     const messageMutation =  `mutation {
          createMessage(input: {
               sender: "${user1.data.create._id}",
               receiver: "${user2.data.create._id}",
               text: "${text}"
          }){
              text
              sender
              conversationId
          }
      }`


     const ctx = {
          user: `${user1.data.create._id}`
      }

      const messsageMut:any = await graphql  ({ schema, source: messageMutation, contextValue:ctx});





      expect(messsageMut.data.createMessage.sender).toBe(user1.data.create._id)
      expect(messsageMut.data.createMessage.text).toBe(text)


  });






 
});