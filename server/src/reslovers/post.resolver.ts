
import {PostService} from "../service/post.service";
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
import { Comment, CommentModel } from "../model/comment.schem";


@Resolver(Post)
export class PostResolver {
  constructor(private readonly postService: PostService,

    ) {
    this.postService = new PostService()

  }

 //@Authorized()
  @Mutation(() => Post)
  createPost(@Arg("input") input: CreatePostInput, @Ctx() ctx: Context) {
    return this.postService.createPost(input, ctx);
  }

  @Query(()=>[Post])
  fineMyPosts( @Ctx() ctx:Context) {
    return this.postService.fineMyPosts(ctx);
  }

  @Query(()=>[Post])
  finePostsByUsername(@Arg("input") input: FindUserByUsernameInput , @Ctx() ctx:Context) {
    return this.postService.finePostsByUsername(input,ctx);
  }
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

  @Query(()=>[Post])
  async getFeed( @Ctx() context:Context){

    return this.postService.getFeeds(context)

  }

  @Mutation(() => Post)
  //@UseGuards(AuthGuard)
  async createComment(
    @Arg("input") createCommentinput: CreateCommentInput,
    @Ctx() context: Context,
  ) {
    return this.postService.createcomment(createCommentinput, context);
  }

  @Mutation(()=>String)
  //@UseGuards(AuthGuard)
  async createLike(
    @Arg("input") createLikeInput: CreateLikeInput,
    @Ctx() context: Context,
  ) {
    return this.postService.createLike(createLikeInput, context);
  }

  @Mutation(()=>String)
  //@UseGuards(AuthGuard)
  async unLike(
    @Arg("input") createLikeInput: CreateLikeInput,
    @Ctx() context: Context,
  ) {
    return this.postService.unLike(createLikeInput, context);
  }

  @FieldResolver(()=>User)
  async owner(@Root() post: PostDocument){
    const owner = await UserModel.findById(post.user)

    return owner
    
  }
  @FieldResolver(()=>[Comment])
  async comments(@Root() post: PostDocument){
    const comments = await CommentModel.find({
      postId: post.id 
    })

    return comments
    
  }


  @Query(()=>Post)
  async findPost(@Arg('input') id:CreateLikeInput, @Ctx() ctx:Context){

    return this.postService.findPostByid(id, ctx)




  }
}
