import { userType } from "../common/user-common-types";
import {Request,Response} from "express";
import AuthUserController from "../controller/auth-user-controller"

const _authUserController = new AuthUserController()

export const register = async (req:Request,res:Response)=>{
    try{
        const {name, email, password} = req.body;
        const authuser:userType={name,email,password}
        const result=await _authUserController.register(authuser)
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
};
export const verifyRegisteredOtp = async (req:Request,res:Response) =>{
    try{
        const {email,otp}=req.body;
        const result = await _authUserController.verifyRegisteredOtp(email,otp);
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
};

export const login = async (req:Request,res:Response) =>{
    try{
        const {email,password}=req.body;
        const result=await _authUserController.login(email,password);
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send(error.message);
    }
}