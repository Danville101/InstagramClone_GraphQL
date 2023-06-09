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
import { IsEmail } from "class-validator";
//import { User } from "../schema/user.schema";
import { GraphQLUpload } from "graphql-upload-minimal"
import { Readable } from 'stream';
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";


import * as mongoose from "mongoose";
import { Stream } from "stream";

export type UserDocument = User & mongoose.Document;





function findByEmail(
     this: ReturnModelType<typeof User, QueryHelpers>,
     email: User["email"]
   ) {
     return this.findOne({ email });
   }
   
   interface QueryHelpers {
     findByEmail: AsQueryMethod<typeof findByEmail>;
   }


@ObjectType()
@index({ email: 1, userName: 1 }, { unique: true })
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({unique: true})
  @Field(() => String)
  email!: string;

  @Prop({unique: true})
  @Field(() => String)
  userName!: string;

  @Prop({})
  @Field(() => Date)
  dateOfBirth!: Date;

  @Prop({default: "http://localhost:8080/public/instagram-defaul_propic.jpeg"})
  @Field(() => String)
  profilePicture: string;

  @Prop({default: "http://localhost:8080/public/instagram-defaul_propic.jpeg"})
  @Field(() => String)
  backgroundPicture: string;

  @Field(() => String)
  @Prop({required: true})
  password!: string;

  @Prop({ ref: () => User })
  @Field(() => [String])
   followers: Ref<User>[];

  @Prop({ ref: () => User })
  @Field(() => [String])
   following: Ref<User>[];
}
 
export const UserModel = getModelForClass<typeof User, QueryHelpers>(User,{schemaOptions:{timestamps:true}})



@InputType()
export class CreateUserInput {
  @Field(() => String)
  userName!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String)
  password2!: string;

  @Field(() => Date)
  dateOfBirth!: Date;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  userName_Email?: string;
  @Field(() => String)
  password!: string;
}

@InputType()
export class AddFollowersInput {
  @Field()
  userToFollow: string;
}



@InputType()
export class FindUserInput {
  @Field()
  _id: string;
}
@InputType()
export class FindUserByUsernameInput {
  @Field()
  username: string;
}

@InputType()
export class SearchUserInput {
  @Field()
  phrase: string;
}




