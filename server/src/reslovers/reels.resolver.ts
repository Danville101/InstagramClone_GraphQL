
import { ReelService } from "../service/reels.service";
import {
  CreateCommentInput,
  CreatePostInput,
  Post,
  CreateLikeInput,
  PostDocument,
} from "../model/post.schema";
import Context from "../interface/context";
import { Arg, Ctx, Mutation, Query, Resolver ,ID, Authorized , FieldResolver, Root} from "type-graphql";
import { PostModel } from "../model/post.schema";
import { FindUserByUsernameInput, User, UserDocument, UserModel } from "../model/user.schema";
import { Reel, ReelDocument, ReelModel, GetReelBytIdInput } from "../model/reels.schema";
import { Comment, CommentModel } from "../model/comment.schem";
import corsHandler from "../utils/corsHandler";

@Resolver(Reel)
export class ReelResolver {
  constructor(private readonly reelService: ReelService,

    ) {
    this.reelService = new ReelService()

  }

 //@Authorized()
//  @Mutation(() => Post)
//  createPost(@Arg("input") input: CreatePostInput, @Ctx() ctx: Context) {
//    return this.postService.createPost(input, ctx);
//  }

//  @Query(()=>[Post])
//  fineMyPosts( @Ctx() ctx:Context) {
//    return this.postService.fineMyPosts(ctx);
//  }
//
 
  // @Query("post")
  // findOne(@Args("id") id: number) {
  //   return this.postService.findOne(id);
  // }

  //@Mutation("updatePost")
  //update(@Args("updatePostInput") updatePostInput: UpdatePostInput) {
  //  return this.postService.update(updatePostInput.id, updatePostInput);
  //}

  //@Mutation("removePost")
  //remove(@Args("id") id: number) {
  //  return this.postService.remove(id);
  //}

  @Query(()=>[Reel])
  async getReel( @Ctx() context:Context){

    return this.reelService.getReels(context)

  }
  @Query(()=>Reel)
  async getReelbyId( @Arg("input") reelIdRequest: GetReelBytIdInput , @Ctx() ctx:Context){
    corsHandler(ctx)

    return  ReelModel.findById(reelIdRequest.reelId)
    

  }

  @Mutation(() => Reel)
  //@UseGuards(AuthGuard)
  async createReelComment(
    @Arg("input") createCommentinput: CreateCommentInput,
    @Ctx() context: Context,
  ) {
    return this.reelService.createcomment(createCommentinput, context);
  }

  @Mutation(() => String)
  //@UseGuards(AuthGuard)
 
  async createReelLike(
    @Arg("input") createLikeInput: CreateLikeInput,
    @Ctx() ctx: Context,
  ) {
   


    ctx.res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  ctx.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  ctx.res.header("Access-Control-Allow-Credentials", "true");
  await ReelModel.updateOne(
  {_id: createLikeInput.postId},
  {
    $addToSet: {likes: ctx.user},
  },
);


return 'done'

  }

  @Mutation(() => String)
  //@UseGuards(AuthGuard)
  async unLikeReel(
    @Arg("input") createLikeInput: CreateLikeInput,
    @Ctx() ctx: Context,
  ) {
   

    corsHandler(ctx)
    await  ReelModel.updateOne(
      {_id: createLikeInput.postId},
      {
        $pull: {likes: ctx.user},
      },
    );
    
    return 'done'

  }

  @FieldResolver(()=>User)
  async owner(@Root() reel: ReelDocument){
    const owner = await UserModel.findById(reel.user)

    return owner
    
  }



  @FieldResolver(()=>[Comment])
  async comments(@Root() reel: ReelDocument){
    const comments = await CommentModel.find({
      postId: reel._id
    })

    return comments
    
  }
}







