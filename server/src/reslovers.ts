import { UserResolver } from "./reslovers/user.resolver";
import { PostResolver } from "./reslovers/post.resolver";
import { MessagesResolver } from "./reslovers/messages.resolver";
import { ReelResolver } from "./reslovers/reels.resolver";
import { ConversationResolver } from "./reslovers/converstaion.resolver";
import { CommentResolver } from "./reslovers/comment.resolver";




export const resolvers =[UserResolver, PostResolver, MessagesResolver, ReelResolver, ConversationResolver, CommentResolver] as const 