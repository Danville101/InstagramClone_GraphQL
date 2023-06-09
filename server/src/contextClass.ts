import { verifyJWT } from "./utils/jwt";

import cookieParser from "cookie-parser";

import { User } from "./model/user.schema";
import { Request } from 'express';


export default class RestContext {
  static _bindings = new WeakMap<Request, RestContext>();
  private req:Request
  
  
  public user = '';
   
  constructor (

  ) {}
    
  getUser(req: Request): string{
    const token =req.cookies.acceesToken
    const userToken = verifyJWT<User>(token)
        return userToken?._id
  }

  static bind (req: Request) : void {
    const ctx = new RestContext();
    RestContext._bindings.set(req, ctx);
  }
    
  static get (req: Request) : RestContext | null {
    return RestContext._bindings.get(req) || null;
  }
}