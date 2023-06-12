import request from 'supertest';
import { GraphQLSchema, graphql } from "graphql";
import path from 'path';
//import { createPost } from './yourRouteHandler';
import { app } from '../utils/rotuesServer';
import mongoose from 'mongoose';
import { buildSchema } from "type-graphql";
import { resolvers } from "../reslovers";

import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';

// Create an Express app


// Configure multer to use in-memory storage for testing

// Mock req and res objects
// 
const req = {
  body: { text: 'Test post' },
  file: {
    originalname: 'test.jpg',
    buffer: Buffer.from('test image data')
  }
};
const res = {
  statusCode: 0,
  status: function (code: number) {
    this.statusCode = code;
    return this;
  },
  send: jest.fn()
};


let mongoServer: MongoMemoryServer;
let schema: GraphQLSchema;


beforeEach( async ()=>{
 
     schema = await buildSchema({
          resolvers,
          validate: true,
        });
      

   mongoServer = await MongoMemoryServer.create();
   let mongoUri = mongoServer.getUri();

  
  await mongoose.connect(mongoUri, {


  });


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
    
    
        const login: any = await graphql({ schema, source: loginMuttion, contextValue:ctx});
    
    
        expect(login.data.login).toBeDefined()
    




   
    
    

    // Perform the request
   const posty = await  request(app)
      .post('/post')
      .field('text', req.body.text)
      .attach('image', req.file.buffer, req.file.originalname)
      .set("Cookie",`acceesToken=${login.data.login}`)
      .expect(200)
      .then(response => {
          console.log(response)
      })


     const YourModel = mongoose.model('Post');

     

    // Create some test data
 

    // Perform the query
    const result = await YourModel.find({ text: { $gt: "Test post" } });





    //xpect(result[0]).toBe("Test post")
  




    // Assert the response
   // expect(posty.statusCode).toBe(200);


   // expect(res.send).toHaveBeenCalledWith('post created');

    // Assert the PostModel save method was called

  });

  it('should handle an error during post creation', async () => {



     const posty = await  request(app)
     .post('/post')
     .attach('image', req.file.buffer, req.file.originalname)




   // Assert the response
   expect(posty.statusCode).toBe(400);
   

  });
});