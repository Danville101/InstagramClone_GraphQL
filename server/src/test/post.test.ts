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

 await graphql({ schema, source: mutation1});

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


})


afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop() ;
 

const directoryPath = 'public/media/posts/testpost';
//public/media/posts/testpost

setTimeout(()=>{fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach( (file) => {
    const filePath = path.join(directoryPath, file);

    fs.unlink(filePath, (error) => {
      if (error) {
        console.error('Error deleting file:', error);
      }
    });
  });
});},


3000)




  
});



// Test the route handler function
describe('createPost', () => {
  it('should create a new post', async () => {
    
    
    
        expect(login.data.login).toBeDefined()
    
    // Perform the request
   const posty = await  request(app)
      .post('/post')
      .field('text', req.body.text)
      .attach('image', req.file.buffer, req.file.originalname)
      .set("Cookie",`acceesToken=${login.data.login}`)
      .expect(200)







  });

  it('should handle an error during post creation', async () => {



     const posty = await  request(app)
     .post('/post')
     .attach('image', req.file.buffer, req.file.originalname)



   expect(posty.statusCode).toBe(400);
   

  });


  it("It should like a post ",async()=>{



  const mutation1  = `mutation {
    create(input: {
      userName:"swag2",
      email: "swag_boy@gma4002.com",
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

 const user2:any =await graphql({ schema, source: mutation1});

  const loginMuttion = `mutation {
    login(input:{
      userName_Email:"swag2",
      password:"126"
    })
}`


const ctx={
  res: {
    header: jest.fn(),
    cookie: jest.fn()
  },
}




   const login2:any = await graphql({ schema, source: loginMuttion, contextValue:ctx});





   const posty = await  request(app)
   .post('/post')
   .field('text', req.body.text)
   .attach('image', req.file.buffer, req.file.originalname)
   .set("Cookie",`acceesToken=${login.data.login}`)
   .expect(200)
  

   const likepost = `mutation {
    createLike(input:{
      postId: "${posty.body.post._id}"

    })
}`


const ctx2={
  user: `${user2.data.create._id}`
}


const like = await graphql({ schema, source: likepost, contextValue: ctx2});



 const postQuery = `query {
  findPost(input:{
    postId:"${posty.body.post._id}"
  }){
      _id
      likes
      media
      owner{
          profilePicture
          userName
          _id
      }
      comments{
          findUser{
              _id
      profilePicture
      userName
          }
          id
          likes
          creator
          text
      }
      text
      user

  }

}`


const getPost:any = await graphql({ schema, source: postQuery , contextValue: ctx2});





expect(getPost.data.findPost.likes[0]).toBe(user2.data.create._id)


  })
});