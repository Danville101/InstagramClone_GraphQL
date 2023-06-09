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


beforeEach( async ()=>{
 

   mongoServer = await MongoMemoryServer.create();
   let mongoUri = mongoServer.getUri();

  
  await mongoose.connect(mongoUri, {


  });

   schema = await buildSchema({
    resolvers,
    validate: true,
  });


})


afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop() ;
});



describe("User test",()=>{
 





  it("should register user", async () => {
   
   
    const mutation =`mutation {
      create(input: {
        userName:"swag",
        email: "swag_boy@gma400.com",
        password: "126",
        password2:"126",
        dateOfBirth:"1995-October-24"
      }), {
        _id
        userName,
        email
  
      
      }
    }`;


    const query = `query{
      findUserByUsername(input:{
        username:"swag"
        
      }), {
        _id
        profilePicture
        followers
        following
        userName
      }
  }`



    const result: any = await graphql({ schema, source: mutation });
    //console.log(result.data.create._id)

    expect(result.data.create.userName).toEqual("swag")

    const ctx = {
 
      res: {
        header: jest.fn(),
      },
    };

    const user: any = await graphql({ schema, source: query , contextValue: ctx });
    //console.log(result.data.create._id)
    console.log(user)
 
    expect(user.data.findUserByUsername.userName).toEqual("swag")



  }, );



// it("should register two users", async () => {
//   const mutation2 =`mutation {
//     create(input: {
//       userName:"swag",
//       email: "swag_boy@gma400.com",
//       password: "126",
//       password2:"126",
//       dateOfBirth:"1995-October-24"
//     }) {
//       _id
//       userName,
//       email
// 
//     
//     }
//   }`;
//
//
//
//
//
//
//   const result: any = await graphql({ schema, source: mutation2 });
//  // console.log(result.data.create._id)
//   expect(result.data.create.userName).toEqual("swag")
// 
//
//
//
// }, );





})