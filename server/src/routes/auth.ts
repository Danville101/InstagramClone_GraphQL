import express from 'express'
import { UserModel } from '../model/user.schema';
import { PostModel } from '../model/post.schema';
import { Request, Response } from 'express';
import RestContext from '../contextClass';

const router = express.Router();
// Configure multer to save uploaded files to the public/image directory


// Route that handles multipart form uploads

router.post("/suty",(req,res)=>{
     const currentUser = res.locals.currentUser
     res.send(currentUser)
   })

export default router