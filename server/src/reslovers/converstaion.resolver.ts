
import {MessagesService} from "../service/messages.service";
import {CreateMessageInput,  Message, MessageDocument, MessageModel, MessageQueryInput} from "../model/messages.schema";
import { Conversation, ConversationDocument, ConversationModel, CreateConversationInput } from "../model/converstaion.schema";
//import {PubSub} from "graphql-subscriptions";
import Context from "../interface/context";
import { Arg, Ctx, Mutation, Query, Resolver ,ID, Authorized, Root, FieldResolver } from "type-graphql";

import {  User } from "../model/user.schema";
import { UserModel } from "../model/user.schema";


@Resolver(Conversation)
export class ConversationResolver {
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
   ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  ctx.res.header("Access-Control-Allow-Credentials", "true");

   return conversations
    
  }


  //@Authorized()
  @Mutation(() => Conversation)
 async createConversation(
  @Arg('input') createConversationReq: CreateConversationInput, @Ctx() ctx: Context ):Promise<Conversation | String> {

     const convo = await ConversationModel.findOne({
          $or:[
               {creator:  ctx.user,
                participant: createConversationReq.participant }, 
                {participant: createConversationReq.participant,
                    participant1: ctx.user }
               
               ]})

     if (convo){
       const  update = await ConversationModel.findOneAndUpdate({_id:convo.id},
       {}, // no changes to make
       { new: true })
       return "updated"
     } else{

          const newConvo = new ConversationModel({
               creator :ctx.user,
               participant :createConversationReq.participant
          })

          return newConvo
     }

   
}

  
 


  @FieldResolver(()=>[Message])
  async messagesList(@Root() conversation: ConversationDocument){
    const messages = await MessageModel.find({
     conversationId :conversation._id
     
    }).sort({ createdAt: 1})

    return messages
    
  }


  @FieldResolver(()=>Message)
  async lastestMessages(@Root() conversation: ConversationDocument){
    const latestMessage = await MessageModel.find({
     conversationId :conversation._id
     
    }).sort({ createdAt : -1})

    return latestMessage[0]
    
  }


  @FieldResolver(()=> User)
  async creatorUser (@Root() conversation: ConversationDocument){
    const  creatorUser = await UserModel.findById(conversation.creator)

    return creatorUser
    
  }


  @FieldResolver(()=> User)
  async participantUser (@Root() conversation: ConversationDocument){
    const  participantUser = await UserModel.findById( conversation.participant )

    return participantUser
    
  }



  @FieldResolver(()=> Boolean)
  async hasUnread (@Root() conversation: ConversationDocument){
    const message = await MessageModel.find({
      conversationId :conversation._id
      
     }).sort({ createdAt : -1})

     let latetestMessage= message[0]

     if(latetestMessage.read){
      return false
     }else{
      return true
     }

    
     
    
     
  }





}


