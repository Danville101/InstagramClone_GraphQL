import Context from "../interface/context"

const corsHandler =(context:Context)=>{

    return(context.res.header("Access-Control-Allow-Origin", "http://localhost:3000"),
    context.res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    context.res.header("Access-Control-Allow-Credentials", "true"))
 }



 export default corsHandler