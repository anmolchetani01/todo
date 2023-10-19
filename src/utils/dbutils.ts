import mongoose from "mongoose"

export const initdb= ()=>{
    console.log(`in db called`)
     mongoose
    .connect(process.env.MONGO_URI,{
        dbName:process.env.DB_NAME,
        serverSelectionTimeoutMS: 5000,
    }).then(()=>{
        console.log(`database connected`)
    }).catch((error)=>{
        console.log(`error in connecting database`,process.env.MONGO_URI)
    })
}
 
