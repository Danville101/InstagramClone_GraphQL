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
import { async } from "rxjs";
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
    //console.log(user)
 
    expect(user.data.findUserByUsername.userName).toEqual("swag")



  }, );



  it("should follow User", async()=>{
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

     const mutation2  = `mutation {
           create(input: {
             userName:"swag2",
             email: "swag2_boy@gma400.com",
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

         const user1: any = await graphql({ schema, source: mutation1});
         const user2: any = await graphql({ schema, source: mutation2});




         const follow = `mutation{
          follow(input:{
            userToFollow: "${user2.data.create._id}"
          })
      }`
      console.log("user 2",user2.data.create._id)

      const ctx ={
        user: `${user1.data.create._id}`
      }

 


        const followUser =  await graphql({ schema, source: follow, contextValue :ctx});
        

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
    
    
    
        const result: any = await graphql({ schema, source: query });
        //console.log(result.data.create._id)
      


         expect(user1.data.create.userName).toEqual("swag")
         expect(user2.data.create.userName).toEqual("swag2")

         console.log("here you go",result.data.findUserByUsername.following)
         console.log(followUser)

         expect(result.data.findUserByUsername.following[0]).toEqual(`${user2.data.create._id}`)
       //  



  })



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