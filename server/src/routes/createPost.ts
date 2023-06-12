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
    cb(null,  process.argv[1].includes("jest") ? 'public/media/posts/testpost' :'public/media/posts');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    let filename = process.argv[1].includes("jest")  ?  `${Date.now()}Test${extension}` : Date.now() + extension ;
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

  if(!req.body.text || !req.file){
    return(
      res.statusCode = 400,
      res.send("Please fill all fields")
    )
  }

  post.save()

  if(post){ 
     
     res.status(200).json({ post, text:"Post created" })
   
   
     console.log(post)
   
   }else{
     res.statusCode=400
     res.send("please try again ")
 
   }
  

});




export default router