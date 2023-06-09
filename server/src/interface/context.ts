import { Request, Response } from "express";


interface Context{
     req: Request;
     res: Response;
     user:string|any;
     token:string|any
}


export default Context