
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
import { Post } from "./post.schema";

export type CommentsDocument = Comment & mongoose.Document;

@ObjectType()
export class Comment {
  @Field(() => ID)
  id?: string;


  @Prop({ ref: () => Post })
  @Field(() => String)
  postId: Ref<Post>;
  

  @Prop({ ref: () => User })
  @Field(() => [String])
  likes: Ref<User>[];

  @Field(() => Date)
  updatedAt?: string;


  @Prop({ ref: () => User })
  @Field(() => String)
  creator  : Ref<User>;

  @Field(() => String)
  @Prop({required: true, unique: false})
  text!: string;


}
export const CommentModel = getModelForClass(Comment,{schemaOptions:{timestamps:true}})

@InputType()
export class CreateCommentsInput {

  @Field(() => String)
  postId!: string;

  @Field(() => String)
  text!: string;




}

@InputType()
export class CommentLinkInput {

  @Field(() => String)
  id: string;
}
