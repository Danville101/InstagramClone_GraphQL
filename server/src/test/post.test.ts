import request from 'supertest';

import path from 'path';
//import { createPost } from './yourRouteHandler';
import { app } from '../utils/rotuesServer';
import mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';

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
  

    // Perform the request
   const posty = await  request(app)
      .post('/post')
      .field('text', req.body.text)
      .attach('image', req.file.buffer, req.file.originalname)


     const YourModel = mongoose.model('Post');

    // Create some test data
 

    // Perform the query
    const result = await YourModel.find({ text: { $gt: "Test post" } });


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