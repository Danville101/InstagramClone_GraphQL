
import {MessagesService} from "../service/messages.service";
import {CreateMessageInput,  Message, MessageDocument, MessageModel, MessageQueryInput} from "../model/messages.schema";
import { Comment , CreateCommentsInput, CommentModel, CommentsDocument, CommentLinkInput} from "../model/comment.schem";
import { Conversation, ConversationDocument, ConversationModel, CreateConversationInput } from "../model/converstaion.schema";
//import {PubSub} from "graphql-subscriptions";
import Context from "../interface/context";
import { Arg, Ctx, Mutation, Query, Resolver ,ID, Authorized, Root, FieldResolver } from "type-graphql";

import {  User } from "../model/user.schema";
import { UserModel } from "../model/user.schema";



@Resolver(Comment)
export class CommentResolver {
  constructor( 

    private readonly ctx: Context
    ){
   

  
  }



 

 
  @Query(()=>[Conversation])
 public async getConversations(
   @Ctx() ctx:Context):Promise<Conversation[]>{
   const  conversations= await ConversationModel.find({
     $or:[{ creator: ctx.user},
          {participant: ctx.user}
     ]
   }).sort({ updatedAt : -1})
 

   return conversations
    
  }


  //@Authorized()
  @Mutation(() => Comment)
 async createComment(
  @Arg('input') createCommentReq: CreateCommentsInput, @Ctx() ctx: Context ):Promise<Comment | String> {

     const comment =  new CommentModel({
          postId : createCommentReq.postId,
          text: createCommentReq.text,
          creator: ctx.user


     })

     comment.save()



    return comment


   
}



@Mutation(()=>String)
//@UseGuards(AuthGuard)
async createCommentLike(
  @Arg("input") createLikeInput: CommentLinkInput,
  @Ctx() ctx: Context,
) {

     await CommentModel.updateOne(
     {_id: createLikeInput.id},
     {
       $addToSet: {likes: ctx.user},
     },
   );

   

   return 'done'



}

@Mutation(()=>String)
//@UseGuards(AuthGuard)
async unLikeComment(
     @Arg("input") createLikeInput: CommentLinkInput,
     @Ctx() ctx: Context,
) {


     await CommentModel.updateOne(
     {_id: createLikeInput.id},
     {
       $pull: {likes: ctx.user},
     },
   );


   return 'done'

}
  
 


  @FieldResolver(()=>[Message])
  async messagesList(@Root() conversation: ConversationDocument){
    const messages = await MessageModel.find({
     conversationId :conversation._id
     
    }).sort({ createdAt: 1})

    return messages
    
  }




  @FieldResolver(()=> User)
  async findUser(@Root() comment:CommentsDocument){
return  UserModel.findById(comment.creator)


    
  }


  @FieldResolver(()=>Message)
  async lastestMessages(@Root() conversation: ConversationDocument){
    const latestMessage = await MessageModel.find({
     conversationId :conversation._id
     
    }).sort({ createdAt : -1})

    return latestMessage[0]
    
  }











}


