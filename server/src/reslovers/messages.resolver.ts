
import {MessagesService} from "../service/messages.service";
import {CreateMessageInput, Message, MessageDocument, MessageModel, MessageQueryInput, ReadMessageInput} from "../model/messages.schema";
//import {PubSub} from "graphql-subscriptions";
import pubsub from "../pubsub/pubsub";
import Context from "../interface/context";
import { Arg, Ctx, Mutation, Query, Resolver ,ID, Authorized, Subscription, Root, PubSub, FieldResolver } from "type-graphql";
import { RedisPubSub } from "graphql-redis-subscriptions";
import {  User } from "../model/user.schema";
import { UserModel } from "../model/user.schema";
import { Ref } from "@typegoose/typegoose";


@Resolver(Message)
export class MessagesResolver {
  constructor( 
    private readonly messagesService: MessagesService,
    private readonly ctx: Context
    ){
    this.messagesService =  new MessagesService();

  
  }

 //@Authorized()
 //@Mutation(() => Message)
 //createMessage(
 //  @Arg("input") createMessageInput: CreateMessageInput,
 //  @Ctx() context: Context,
 //) {
 //  const newMessage = this.messagesService.createMessage(
 //    createMessageInput,
 //    context,
 //  );
 //  pubsub.publish("NOTIFICATIONS", {
 //    messageAdded: newMessage.text,
 //  });

 //  return newMessage;
 //}

 
  @Query(()=>[Message])
 public async getMessage(
    @Arg('input') getMessageRequest: MessageQueryInput , @Ctx() context:Context):Promise<Message[]>{
   const  messages= await this.messagesService.getMessages(getMessageRequest, context)

   return messages
    
  }
  
  @Query(()=>[User])
  async getConversation(
    @Ctx() context:Context){
   const  conversations= await this.messagesService.findConversations(context)


   return conversations
    
  }

  //@Authorized()
  @Mutation(() => Message)
 async createMessage(
  @Arg('input') createMessageInput: CreateMessageInput, @PubSub() pubsub: RedisPubSub, @Ctx() context: Context ):Promise<Message> {

    const newMessage = await this.messagesService.createMessage(
      createMessageInput,
      context,
    );
    
       const payload = { text:createMessageInput.text,
                        sender: createMessageInput.sender,
                        receiver: createMessageInput.receiver
                         
      };

       await pubsub.publish(`NOTIFICATIONS${createMessageInput.receiver}` , payload);
       
     

 
   return newMessage;
}

  
 
   //@Authorized()
   @Subscription({
    topics: ({ args }) => `NOTIFICATIONS${args.recipientId}`
  })
  messageAdded(
    @Root() notificationPayload: Message,
    @Arg('recipientId') recipientId: string,
  //  @Arg('sender') sender: string 

  ): Message {


 console.log(notificationPayload)

  
    return notificationPayload;
  }
  

  @FieldResolver(()=>User)
  async owner(@Root() message: MessageDocument){
    const owner = await UserModel.findById(message.sender)

    return owner
    
  }
  @FieldResolver(()=>User)
  async recipient(@Root() message: MessageDocument){
    const recipient = await UserModel.findById(message.receiver)

    return recipient
    
  }


  @Mutation(()=> String)
  async readMessage(@Arg("input") messageid: ReadMessageInput, @Ctx() ctx:Context){

    const message = await MessageModel.updateOne( {_id: messageid.id},
  {read:true}
      )

      ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      ctx.res.header("Access-Control-Allow-Credentials", "true");
      console.log({"this Message was read": messageid.id})
  return "done"
  }





}


