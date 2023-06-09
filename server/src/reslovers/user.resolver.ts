
import { UserService } from "../service/user.service";
import {AddFollowersInput, CreateUserInput, FindUserByUsernameInput, FindUserInput, LoginInput,  SearchUserInput} from "../model/user.schema";
import {User} from "../model/user.schema";
import Context from "../interface/context";
import { Arg, Ctx, Mutation, Query, Resolver ,ID } from "type-graphql";
import { Response } from "express";

@Resolver(User)
export class UserResolver {
  constructor(public userService: UserService) {
    this.userService = new UserService()
  }

  @Mutation(() => User)
  create(@Arg("input") createUserInput: CreateUserInput, @Ctx() ctx: Context) {
    return this.userService.create(createUserInput, ctx);
  }

  @Query(() => [User])
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOne(@Arg("id") id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() ctx: Context) {
    return this.userService.login(input, ctx);
  }

  @Query(() => String)
  //@UseGuards(AuthGuard)
  show() {
    return this.userService.showr;
  }

  @Mutation(() => String)
  //@UseGuards(AuthGuard)
  follow(@Arg("input") input: AddFollowersInput, @Ctx() ctx: Context) {

      return this.userService.Follow(input, ctx);
   

  
  }
  @Mutation(() => String)
  //@UseGuards(AuthGuard)
  unfollow(@Arg("input") input: AddFollowersInput, @Ctx() ctx: Context) {

      return this.userService.unFollow(input, ctx);
   

  
  }

 

  @Query(() => User)
  // @UseGuards(AuthGuard)
   findMe(  @Ctx() ctx: Context) {
     return  this.userService.findMe( ctx);

   }

  @Query(() => User)
  // @UseGuards(AuthGuard)
   findUser( @Arg("input") user:FindUserInput ,  @Ctx() ctx: Context) {
     return  this.userService.findUser( user, ctx);

   }


  @Query(() => [User])
  // @UseGuards(AuthGuard)
   searchUser(@Arg("input") input: SearchUserInput , @Ctx() ctx:Context) {

     return  this.userService.searchUser(input, ctx);

   }

  @Query(() => User)
  // @UseGuards(AuthGuard)
   findUserByUsername(@Arg("input") user: FindUserByUsernameInput , @Ctx() ctx:Context) {
     return  this.userService.findUserByUsername(user, ctx);

   }

  //@ResolveField()
  //async follwers(@Parent() parent: User) {
  //  return this.userService.find({userName: parent.userName});
  //}

  //@Mutation('updateUser')
  //update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //  return this.userService.update(updateUserInput.id, updateUserInput);
  //}

  //@Mutation('removeUser')
  //remove(@Args('id') id: number) {
  //  return this.userService.remove(id);
  //}
}
