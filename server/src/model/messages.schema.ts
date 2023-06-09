
import { User } from "./user.schema";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
     getModelForClass,
     Prop,
     pre,
     ReturnModelType,
     queryMethod,
     index,
     Ref
   } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { Conversation } from "./converstaion.schema";

export type MessageDocument = Message & mongoose.Document;

@ObjectType()
export class Message {
  @Field(() => ID)
  id?: string;

  @Field(() => String)
  @Prop({required: true, unique: false})
  text?: string;


  @Field(() => Boolean)
  @Prop({required: true, default:false })
  read!: boolean;



  @Prop({ ref: () => User })
  @Field(() => String)
   sender!: Ref<User>;


  @Prop({ ref: () => User })
  @Field(() => String)
  receiver!: Ref<User>;

  @Prop({ ref: () => Conversation })
  @Field(() => String)
  conversationId: Ref<Conversation>;



}
export const MessageModel = getModelForClass(Message,{schemaOptions:{timestamps:true}})

@InputType()
export class CreateMessageInput {
  
  @Field(() => String)
  text: string;
  @Field(() => String)
  sender!: string;

  @Field(() => String)
  receiver!: string;

}

@InputType()
export class MessageQueryInput {

  @Field(() => String)
  receiver: string;
}

@InputType()
export class ReadMessageInput {

  @Field(() => String)
  id: string;
}
