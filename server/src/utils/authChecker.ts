import { AuthChecker } from "type-graphql";
import Context from "../interface/context";

const authChecker: AuthChecker<Context>=({context})=>{
     
     return !! context.user
}


export default authChecker