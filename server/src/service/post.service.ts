
import {
  Post,
  PostDocument,
  CreatePostInput,
  CreateCommentInput,
  CreateLikeInput,
  PostModel
} from "../model/post.schema";
import {Model} from "mongoose";
import Context from "../interface/context";
import { FindUserByUsernameInput, UserModel } from "../model/user.schema";


export class PostService {
  
  async createPost(createPostInput: CreatePostInput, context: Context) {
    const post = new PostModel({
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
    return PostModel.updateOne(
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

  async createLike(createLikeInput: CreateLikeInput, ctx: Context) {
   

      await PostModel.updateOne(
      {_id: createLikeInput.postId},
      {
        $addToSet: {likes: ctx.user},
      },
    );
 

    return 'done'
  
  }

  async unLike(createLikeInput: CreateLikeInput, ctx: Context) {
   

  
  await  PostModel.updateOne(
      {_id: createLikeInput.postId},
      {
        $pull: {likes: ctx.user},
      },
    );

    return 'done'
  
  }





  async fineMyPosts(ctx: Context) {

    
    const posts = await PostModel.find(
      {user: ctx.user}
      
    );

    return posts

 
  }

  async finePostsByUsername(userInput:FindUserByUsernameInput,ctx: Context) {


    const user= await UserModel.findOne({userName:userInput.username})
    const posts = await PostModel.find(
      {user: user?._id}
      
    );

    return posts

 
  }




async getFeeds(ctx:Context){
  const currentUser = await UserModel.findById(ctx.user)
  const feeds:any[]=[]
  feeds.push()

  if(currentUser){

  const followingId = currentUser.following 

  const userPosts = await PostModel.find({user:ctx.user})
  feeds.push(userPosts)

  for(let i of followingId){
   let followingPost = await PostModel.find({user:i})

   feeds.push(followingPost)






  }
  const newpack = feeds.flat().sort((a, b) => b.createdAt - a.createdAt )
   return newpack
  }



 // console.log(feeds)
 


}



async findPostByid(id: CreateLikeInput, ctx:Context){

  const post = PostModel.findById(id.postId)

  return post



}

  //update(id: number, updatePostInput: UpdatePostInput) {
  //  return `This action updates a #${id} post`;
  //}

  //remove(id: number) {
  //  return `This action removes a #${id} post`;
  //}
}
