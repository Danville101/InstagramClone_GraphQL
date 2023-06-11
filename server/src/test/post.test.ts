import request from 'supertest';
import multer from 'multer';
import path from 'path';
//import { createPost } from './yourRouteHandler';
import { app } from '../utils/rotuesServer';
import { GraphQLSchema } from "graphql";
import mongoose from 'mongoose';
import { PostModel } from '../model/post.schema';

import { MongoMemoryServer } from 'mongodb-memory-server';
// Create an Express app


// Configure multer to use in-memory storage for testing

// Mock req and res objects
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


beforeEach( async ()=>{
 

   mongoServer = await MongoMemoryServer.create();
   let mongoUri = mongoServer.getUri();

  
  await mongoose.connect(mongoUri, {


  });


})


afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop() ;
});



// Test the route handler function
describe('createPost', () => {
  it('should create a new post', async () => {
  

    // Perform the request
   const posty = await  request(app)
      .post('/post')
      .field('text', req.body.text)
      .attach('image', req.file.buffer, req.file.originalname)


     const YourModel = mongoose.model('Post');

    // Create some test data
 

    // Perform the query
    const result = await YourModel.find({ text: { $gt: "Test post" } });

    console.log(result)

    //xpect(result[0]).toBe("Test post")





    // Assert the response
    expect(posty.statusCode).toBe(200);


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