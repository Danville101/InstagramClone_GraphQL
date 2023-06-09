import jwt from "jsonwebtoken"
//import config from "config";
//
//const privateKey = Buffer.from(
//     config.get<string>("privateKey"),
//     "base64"
//   ).toString("ascii");
//

export function signJWT(obj:any){

     return  jwt.sign(obj,"XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0="  )
}

export const verifyJWT=<T>(token: string):T =>{


          const decode = jwt.verify(token ,"XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0="   ) as T;
          
          return decode
     


}