import jwt from "jsonwebtoken"

export const generateToken = async(payload:any)=>{
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    console.log(`in token-utils token is ${token}`)
    return token;
}