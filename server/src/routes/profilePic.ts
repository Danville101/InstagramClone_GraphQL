import express from 'express'
import { UserModel } from '../model/user.schema';

import multer  from 'multer';
import  path  from 'path';
import { STATUS_CODES } from 'http';
const router = express.Router();
// Configure multer to save uploaded files to the public/image directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/media');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = Date.now() + extension;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Route that handles multipart form uploads
router.post('/profilePic', upload.single('image'), async(req, res) => {
  const  filename  = req.file?.filename ;
  const imagePath = `/media/${filename}`;
 const update =await UserModel.findOneAndUpdate(
    { _id:res.locals.currentUser},
    { profilePicture:`http://127.0.0.1:4040${imagePath}`},
    {new:true},
   
    
  )
  if(update){
    res.statusCode=200
    res.send("profile update")
  }else{
    res.statusCode=400
    res.send("please try again ")

  }



});



export default router
