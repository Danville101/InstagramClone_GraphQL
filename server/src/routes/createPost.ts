import express from 'express'
import { UserModel } from '../model/user.schema';
import { PostModel } from '../model/post.schema';
import { Request, Response } from 'express';
import RestContext from '../contextClass';

import multer  from 'multer';
import  path  from 'path';
const router = express.Router();
// Configure multer to save uploaded files to the public/image directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/media/posts');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = Date.now() + extension;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Route that handles multipart form uploads
router.post('/post', upload.single('image'), async(req : Request, res:Response, ) => {
  const { text } = req.body;
  const  filename  = req.file?.filename ;
  const imagePath = `/media/posts/${filename}`;
  const post= await  new PostModel({
     media:imagePath.toLowerCase(),
     text: text,
     user:res.locals.currentUser
  })

  if(!req.body.text || req.files){
    return(
      res.statusCode = 400,
      res.send("Please fill all fields")
    )
  }

  post.save()

  if(post){
     res.statusCode=200
     res.send("post created")
   }else{
     res.statusCode=400
     res.send("please try again ")
 
   }
 

});




export default router