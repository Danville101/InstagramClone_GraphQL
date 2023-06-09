
import {CreateMessageInput, Message, MessageModel, MessageQueryInput} from "../model/messages.schema";
import {MessageDocument} from "../model/messages.schema";
import {Model} from "mongoose";
import Context from "../interface/context";
import { UserModel } from "../model/user.schema";

import { ConversationModel } from "../model/converstaion.schema";
import corsHandler from "../utils/corsHandler";


export class MessagesService {


  async createMessage(createMessageInput: CreateMessageInput, ctx: Context) {

    const convo = await ConversationModel.findOne({
      $or:[
           {creator:  ctx.user,
            participant: createMessageInput.receiver}, 
            {creator: createMessageInput.receiver,
                participant: ctx.user }
           
           ]})

           if(convo){
            await  ConversationModel.findOneAndUpdate({_id:convo._id}, { updatedAt: new Date() }, {
              new: true,
             
            })

            
            const message = new MessageModel({
              sender: createMessageInput.sender,
              receiver: createMessageInput.receiver,
              text: createMessageInput.text,
              conversationId: convo._id
            });

           // ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
           // ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           // ctx.res.header("Access-Control-Allow-Credentials", "true");

            message.save()
            return message
           }else{

           const newConvo =  new ConversationModel({
            creator: ctx.user,
            participant: createMessageInput.receiver

           })

           newConvo.save()

           const message = new MessageModel({
            sender:  createMessageInput.sender,
            receiver: createMessageInput.receiver,
            text: createMessageInput.text,
            conversationId: newConvo._id
          });


          //ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
          //ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          //ctx.res.header("Access-Control-Allow-Credentials", "true");


          message.save()
          return message

           }

  //  const message = new MessageModel({
    //  sender: ctx.user,
      //receiver: createMessageInput.receiver,
     // text: createMessageInput.text,
   // });

 
   // message.save();
   // return message;
  }

  getContext(context: Context){
    return context.user
  }

  async getMessages(getMessageRequest:MessageQueryInput, ctx:Context) {
    
    let message = await MessageModel.find({
    $or: [
        {sender: ctx.user, receiver: getMessageRequest.receiver},
        {sender: getMessageRequest.receiver, receiver: ctx.user}
    ]
}).sort({date: 1})
//ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//ctx.res.header("Access-Control-Allow-Credentials", "true");


return message

  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  //update(id: number, updateMessageInput: UpdateMessageInput) {
  //  return `This action updates a #${id} message`;
  //}

  remove(id: number) {
    return `This action removes a #${id} message`;
  }



  async findConversations(ctx:Context){
     let converstaions=[]
    let messages = await MessageModel.find({
      $or: [
          {sender: ctx.user,},
          {receiver: ctx.user}
      ]
  }).sort({date: 1})

  let mySet = new Set()
  
  for(let i of messages){
    if (i.receiver === ctx.user){

      mySet.add(String(i.sender))
    }
    if(i.sender== ctx.user){
    
      mySet.add(String(i.receiver))
    }
  }
 
  for ( let i of mySet){
    const  user = await UserModel.findById(i)

    if (user !=null){
    converstaions.push(user)
    }
  

    const checkMe:any= await MessageModel.find({
      $or: [
          {sender: ctx.user,},
          {receiver: ctx.user}
      ]
  }).sort({date: 1})
  
  


  

  }
  //ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //ctx.res.header("Access-Control-Allow-Credentials", "true");

  return converstaions
  

  

  }
}
