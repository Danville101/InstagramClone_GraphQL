
import {
     Post,
     PostDocument,
     CreatePostInput,
     CreateCommentInput,
     CreateLikeInput,
     PostModel
   } from "../model/post.schema";
   import { Reel, ReelDocument, ReelModel } from "../model/reels.schema";
   import {Model} from "mongoose";
   import Context from "../interface/context";
   import { FindUserByUsernameInput, UserModel } from "../model/user.schema";
   import corsHandler from "../utils/corsHandler";
   
   export class ReelService {
     
     async createPost(createPostInput: CreatePostInput, context: Context) {
       const post = new ReelModel({
         text: createPostInput.text,
         user: context.user,
         media: createPostInput.media,
       });
       await post.save();
     
       return post;
     }
   
     findAll() {
       return `This action returns all post`;
     }
   
     findOne(id: number) {
       return `This action returns a #${id} post`;
     }
   
     async createcomment(createCommentInput: CreateCommentInput, context: Context) {
       return ReelModel.updateOne(
         {_id: createCommentInput.postId},
         {
           $push: {
             comment: {
               userId: context.user,
               postId: createCommentInput.postId,
               text: createCommentInput.text,
             },
           },
         },
       );
       //return this.postModel.find({_id: createCommentInput.postId}).lean();
     }
   
     async createLike(createLikeInput: CreateLikeInput, context: Context) {
       return ReelModel.updateOne(
         {_id: createLikeInput.postId},
         {
           $addToSet: {likes: context.user},
         },
       );
     }
   
     async fineMyReels(ctx: Context) {
   
         ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
       ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       ctx.res.header("Access-Control-Allow-Credentials", "true");
       const posts = await ReelModel.find(
         {user: ctx.user}
         
       );
   
       return posts
   
    
     }
   
     async fineReelsByUsername(userInput:FindUserByUsernameInput,ctx: Context) {
   
         ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
       ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       ctx.res.header("Access-Control-Allow-Credentials", "true");
   
       const user= await UserModel.findOne({userName:userInput.username})
       const posts = await ReelModel.find(
         {user: user?._id}
         
       );
   
       return posts
   
    
     }
   
   
   
   
   async getReels(ctx:Context){

     const feeds:any=[]
   
  
   
     const  reels = await ReelModel.find()

   
    ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
     ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     ctx.res.header("Access-Control-Allow-Credentials", "true");


     return reels
   

   
   }
   
     //update(id: number, updatePostInput: UpdatePostInput) {
     //  return `This action updates a #${id} post`;
     //}
   
     //remove(id: number) {
     //  return `This action removes a #${id} post`;
     //}
   }
   