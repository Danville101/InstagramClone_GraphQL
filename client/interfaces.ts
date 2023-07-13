export interface  FindUserType {  _id:string,
profilePicture:string,
followers?:string,
following?:string,
userName:string}

interface LastestMessages{


     receiver :string
     text:string
     sender:string
     read:boolean
}


interface ParticipantUser{
     _id:string
     profilePicture:string
     userName:string
}

interface CreatorUser{
     _id:string
     profilePicture:string
     userName:string
}


export interface CONVOLISTType {


     id:string,
     updatedAt:string
     hasUnread:boolean,
     creator?:string
     participant?:string
     lastestMessages:LastestMessages,
     
     participantUser:ParticipantUser

     creatorUser :CreatorUser
   
     
}



