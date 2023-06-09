
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
import { Message } from "./messages.schema";

export type ConversationDocument = Conversation & mongoose.Document;

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id?: string;

  @Field(() => Date)
  updatedAt?: string;


  @Prop({ ref: () => User })
  @Field(() => String)
  creator  : Ref<User>;


  @Prop({ ref: () => User })
  @Field(() => String)
  participant: Ref<User>;

}
export const ConversationModel = getModelForClass(Conversation,{schemaOptions:{timestamps:true}})

@InputType()
export class CreateConversationInput {

  @Field(() => String)
  participant!: string;

}

@InputType()
export class ConversationQueryInput {

  @Field(() => String)
  participant: string;
}
