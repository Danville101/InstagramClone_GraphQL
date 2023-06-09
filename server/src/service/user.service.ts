
import {Model} from "mongoose";
import {
  User,
  UserDocument,
  CreateUserInput,
  AddFollowersInput,
  LoginInput,
  SearchUserInput,
  FindUserInput,
  FindUserByUsernameInput
} from "../model/user.schema";
import  bcrypt from "bcrypt";
import Context from "../interface/context";
import {signJWT, verifyJWT} from "../utils/jwt";
import { UserModel } from "../model/user.schema";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { Context as subContext } from "graphql-ws";
import path from "path";
import fs from "fs";
import { MessageModel } from "../model/messages.schema";
import corsHandler from "../utils/corsHandler";
import { ApolloError } from "apollo-server-core";

export class UserService {


  async showr(){
    return "hii"
  }

  async create(createUserInput: CreateUserInput, context: Context) {
    
    if (createUserInput.password !== createUserInput.password2) {
      //corsHandler(context)
    throw new ApolloError("passwords dont match", "400")
    //  throw new ApolloError('Not Found', 'NOT_FOUND', { code: 404 });

    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(createUserInput.password, salt);

    createUserInput.password = hash;
    const newUser = new UserModel(createUserInput);

    await newUser.save();
   // corsHandler(context)
    return newUser;
  }

  async login(loginInput: LoginInput, context: Context) {
    const user = await UserModel
      .findOne({
        $or: [
          {email: loginInput.userName_Email},
          {userName: loginInput.userName_Email},
        ],
      })
      .lean();

    if (!user || !(await bcrypt.compare(loginInput.password, user.password))) {
    // corsHandler(context)
      throw new ApolloError("Sorry, your password or email was incorrect. Please double-check your password and email.")
    }

    const user_Detail = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    
    };

 
    const message = {
      _id: user._id,
 
    
    };

   

    const messageToken = signJWT(message);
    const token = signJWT(user_Detail);

    context.res.cookie("acceesToken", token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    context.res.cookie("messageToken",messageToken , {
      maxAge: 3.154e10, // 1 year

      domain: "localhost",
      path: "/",
     
    });

   // corsHandler(context)
     return token;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async Follow(input: AddFollowersInput, ctx: Context) {
   
      await UserModel.updateOne(
        {_id: ctx.user},
        {
          $addToSet: {following: input.userToFollow},
        },
      );

      await UserModel.updateOne(
        {_id: input.userToFollow},
        {
          $addToSet: {followers: ctx.user},
        },
      );
     // corsHandler(ctx)

      return "true"
  }

  async unFollow(input: AddFollowersInput, ctx: Context) {

      await UserModel.updateOne(
        {_id: ctx.user},
        {
          $pull: {
            following: input.userToFollow,
          },
        },
      );

      await UserModel.updateOne(
        {_id: input.userToFollow},
        {
          $pull: {
            followers: ctx.user,
          },
        },
      );

  
     // corsHandler(ctx)

      return "true"
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async findMe( ctx: Context){
    const user = UserModel.findById({_id: ctx.user})
   // corsHandler(ctx)
    return user
  }


  async findUser( userInput:FindUserInput, ctx:Context){
    const user = UserModel.findById({_id: userInput._id})
   // corsHandler(ctx)
    return user
  }




  async searchUser(search: SearchUserInput , ctx:Context) {
    const phrase = search.phrase;
    let users = await UserModel.find({
      $or: [
        { email: new RegExp(phrase, 'i') },
        { userName: new RegExp(phrase, 'i') }
      ]
    }).sort({date: 1});

   // corsHandler(ctx)

    return users
  }





  async findUserByUsername( userInput:FindUserByUsernameInput, ctx:Context){
    const user =  await UserModel.findOne({userName:userInput.username})
   // corsHandler(ctx)
    return user
  }



  

  


}
