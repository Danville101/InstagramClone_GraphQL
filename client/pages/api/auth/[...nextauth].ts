import  bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import { options } from "express/lib/application";

const prisma = new PrismaClient();
import type { NextAuthOptions } from 'next-auth'
export const authOptions: NextAuthOptions = {
  providers : [
    // Google Provider
 
    CredentialsProvider({
        name : "Credentials",
        credentials:{
           email: { label: "Username", type: "text", placeholder: "jsmith" },
  password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req){


            // check user existance
            const result = await prisma.users.findUnique({where:{
                userName: credentials.email
            }})
            if(!result){
                throw new Error("No user Found with Email Please Sign Up...!")
            }

            // compare()
     
            
            const checkPassword = await bcrypt.compare(credentials?.password, result.password);
            
            // incorrect password
            if(!checkPassword || result.userName !== credentials.email ){
                throw new Error("Username or Password doesn't match");
            }

            return result;

        }
    })
],
secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
session: {
    strategy: 'jwt',
},


jwt:{
  secret:"XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
  
  
  
},
callbacks:{
 session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return Promise.resolve({
           ...session,

         });
      
    },
    jwt: async ({ user, token }) => {

      
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    
 
},

cookies:{
 sessionToken: {
      name: `nextauthcookie`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }

}
}


}
  // your configs

export default NextAuth(authOptions);

