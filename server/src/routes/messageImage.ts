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
    cb(null, 'public/media/message');
  },
  filename: async(req, file, cb) => {
    const extension = await path.extname(file.originalname);
    const filename = await Date.now() + extension;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Route that handles multipart form uploads
router.post('/messageImage', upload.single('image'), async(req , res ) => {

  const  filename  = req.file?.filename ;
  const imagePath = `/media/message/${filename}`;
   console.log(`http://127.0.0.1:4040${imagePath}`)

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Credentials", "true");

     res.status(200)
     res.json(`http://127.0.0.1:4040${imagePath}`)

     
      

      
      
 

});




export default router