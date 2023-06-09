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

import { User } from "./user.schema";

export type ReelDocument = Reel & mongoose.Document;


@ObjectType()
export class Reel {
  @Field(() => ID)
  _id: string;

  @Prop({required: true})
  @Field(() => String)
  text?: string;
  @Prop({required: false})
  @Field(() => String)
  video?: string;


  @Prop({ ref: () => User })
  @Field(() => String)
   user: Ref<User>;


  @Prop({ ref: () => User })
  @Field(() => [String])
   likes: Ref<User>[];


  @Prop({ ref: () => User })
  @Field(() => [String])
   comment: Ref<Comment>[];

}

export const ReelModel = getModelForClass(Reel,{schemaOptions:{timestamps:true}})



@ObjectType()
class Comment {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  postId: string;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  text: string;

  @Field(() => String)
  postId: string;
}

@InputType()
export class CreateLikeInput {
  @Field(() => String)
  postId: string;
}
@InputType()
export class GetReelBytIdInput {
  @Field(() => String)
  reelId: string;
}

@InputType()
export class CreatePostInput {
  @Field(() => String)
  text?: string;

  @Field(() => String)
  media?: string;
}
