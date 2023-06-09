//import gql from "graphql-tag";
import {gql} from "@apollo/client"
import { query } from "express/lib/request"
export const USERS_QUERY = gql`
query Users{
     users{
         id
         email
         firstName
         password
         
     }
 }
`





export const CREATE_USER= gql`
mutation Create($input: CreateUserInput!){
     create(input:$input){
     userName
     email
     password
     dateOfBirth
     }
         
 
 }`




 export const USER_QUERY = gql`
query User($id: ID!){
     user(id:$id){
         id
         email
         lastName
         firstName
         password
         
     }
 }
`


 export const DELETE_USER_QUERY= gql`
 mutation DeleteUser($id: ID!){
    deleteUser(id:$id)
 }
 
 `


 export const CREATE_MESSAGE= gql` 
 mutation CreateMessage($input: CreateMessageInput!){
    createMessage(input: $input){
        text

    }
}`



 export const MESSAGE_SUB = gql`subscription Subscription($recipientId: String!) {
    messageAdded(recipientId: $recipientId) {
      text
      sender
    }
  }
  `


export const GET_MESSAGES= gql`query Messages($input: MessageQueryInput!){
    getMessage(input:$input){
        id
        receiver
        text
        sender
        read
       }
}`


export const LOGIN = gql`
mutation Login($input: LoginInput!){
    login(input:$input)
}
`


export const UPLOADPROFILEPIC= gql`
mutation AddProfilepic($input: AddImageInput!){
    addProfilepic(input:$input){
        _id
    }

}
`


export const FINDME= gql`
query FindMe{
    findMe{
        _id
        profilePicture
        followers
        following
        userName
    }
}`

export const LIKETWEET= gql`
mutation Createlike($input: CreateLikeInput!){
    createLike(input:$input)
}`

export const UNTWEET= gql`
mutation UnLike($input: CreateLikeInput!){
    unLike(input:$input)
}`
export const LIKEREEL= gql`
mutation CreateReellike($input: CreateLikeInput!){
    createReelLike(input:$input)
}`

export const UNLIKEREEL= gql`
mutation UnLikeReel($input: CreateLikeInput!){
    unLikeReel(input:$input)
}`









export const SEARCHUSER=gql`
query searchUser($input:SearchUserInput!){
    searchUser(input:$input){
        _id
        userName
        email 
        followers
        following
        profilePicture
        backgroundPicture

    }
}`
export const GETCONVO=gql`
query GetConversation{
    getConversation{
        _id
        userName
        email 
        followers
        following
        profilePicture
        backgroundPicture

    }
}`


export const FINDEMYTWEET= gql`
query FineMyPosts{
    fineMyPosts{
        _id
        media
        likes
        text
        user
        comment
    }
}`


export const FINDUSER= gql`
query FindUser($input: FindUserInput!){
    findUser(input:$input){
        _id
        profilePicture
        followers
        following
        userName
    }
}`


export const GETFEED = gql`
query GetFeed{
    getFeed{
          _id
        media
        likes
        text
        user
        comment
        owner{
            _id
            profilePicture
            userName
            

        }

        comments{
            findUser{
                _id
        profilePicture
        userName
            }
            likes
            creator
            text
            id
        }
    }
}`


export const FINDDUSERBYUSERNAME= gql`
query FindUserByUserName($input: FindUserByUsernameInput!){
    findUserByUsername(input:$input){
        _id
        profilePicture
        followers
        following
        userName
    }
}
`


export const FINDTWEETBYUSERNAME= gql`
query FinePostByUsername($input: FindUserByUsernameInput!){
    finePostsByUsername(input:$input){
        _id
        media
        likes
        text
        user
        comment
    }
}`


export const FINDREELS= gql`
query GetReel{
    getReel{
          _id
        video
        likes
        text
        user
        comment
        owner{
            _id
            profilePicture
            userName
            

        }

    }
}`


export const FOLLOW=gql`
mutation Follow($input: AddFollowersInput!){
    follow(input: $input)
}
`
export const UNFOLLOW=gql`
mutation unFollow($input: AddFollowersInput!){
    unfollow(input: $input)
}
`

export const CONVOLIST=gql`
query Getconvo{
    getConversations{
        id
        updatedAt
        hasUnread
        creator
        participant
        lastestMessages{
        receiver
        text
        sender
        read
        }
        
        participantUser{
            _id
            profilePicture
            userName

        }

        creatorUser{
             _id
            profilePicture
            userName
        }

      
        
    }
}
`

export const READ= gql`

mutation ReadMessage($input: ReadMessageInput!){
    readMessage(input:$input)
}`



export const GETDETAILTWEET = gql`
query GetPost($input: CreateLikeInput!){
    findPost(input:$input){
        _id
        likes
        media
        owner{
            profilePicture
            userName
            _id
        }
        comments{
            findUser{
                _id
        profilePicture
        userName
            }
            likes
            creator
            text
            id
        }
        text
        user

    }

}`



export const CREATETWEETCOMMENT = gql`
mutation CreateComment($input: CreateCommentsInput!){
    createComment(input:$input){
        text


    }

}
`


export const CREATETWEETCOMMENTLIKE = gql`
mutation CreateCommentLike($input: CommentLinkInput!){
    createCommentLike(input:$input)
}
`


export const CREATETWEETCOMMENTUNLIKE = gql`
mutation UnLikeComment($input: CommentLinkInput!){
    unLikeComment(input:$input)
}
`



export const GETREELBYID = gql`
query GetReelById($input: GetReelBytIdInput!){
    getReelbyId(input:$input){
        _id
        video
        owner{
            profilePicture
            userName
        }
        likes
        comment

        comments{
            findUser{
                _id
        profilePicture
        userName
            }
            likes
            creator
            text
            id
        }
        
    }
}`




export const CREATEREELCOMMENTLIKE = gql`
mutation CreateReelCommentLike($input: CommentLinkInput!){
    createReelLike(input:$input)
}
`


export const CREATEREELCOMMENTUNLIKE = gql`
mutation UnLikeReekComment($input: CommentLinkInput!){
    unLikeReel(input:$input)
}
`

