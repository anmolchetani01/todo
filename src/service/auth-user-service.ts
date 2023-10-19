import NotificationAdapter from "../adapter/notification-adapter";
import * as tokenUtils from "../common/token-utils";
import { userType } from "../common/user-common-types";
import AuthUser, { IAuthUser } from "../model/auth_user";
import Otp from "../model/otp";
import BaseAuthUserService from "./base-authuser-service";
import OtpService from "./otp-service";
import bcrypt from "bcrypt";

export default class AuthUserService extends BaseAuthUserService {
    _notificationAdapter = new NotificationAdapter();
    _otpService = new OtpService();
    
    public register = async (authuser:userType):Promise<any> => {
        await this.preventExistingEmailUse(authuser.email)
        const newuser = new AuthUser(authuser);
        await newuser.save();
        const otp = await this.createAndSendOtp(newuser);
        return {_id:newuser._id,otp};
    };

    public login = async (email:string,password:string) =>{
        const user=await this.getAuthUser(email);
        console.log(`in auth-user-service ${user}`)
        if(!user)
        {
            throw new Error(`user does'nt exists invalid email`)
        }
        const isCorrectPassword=await bcrypt.compare(password,user.password);
        if(!isCorrectPassword)
        {
            throw new Error(`invalid password password is incorrect`)
        }
        user.is_logged_in=true;
        await user.save();
        const token = await tokenUtils.generateToken({email});
        return {_id:user._id,token};
    }

    public verifyOtp = async (email:string,otp:string) =>{
        const authuser=await this.getAuthUser(email);
        if(!authuser)
        {
            throw new Error(`user does'nt exists invalid email`)
        }
        const otpData = await this._otpService.getOtpData(email,otp);
        if(otpData.length===0)
        {
            throw new Error(`email and otp not matched invalid otp`)
        }
        await this.updateVerifiedAuthUser(authuser);
        return {_id:authuser._id};

    };

    public createAndSendOtp = async (authuser:any)=>{
        const {_id:userId,email}=authuser;
        const otpNumber=Math.floor(100000+ Math.random()*900000);
        const otp=new Otp({
            userId,
            email,
            otp:otpNumber
        });
        otp.save();
        // await this._notificationAdapter.sendOtp(otp.otp,email);
        return otp.otp!;
    };
}