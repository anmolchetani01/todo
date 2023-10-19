import { userType } from "../common/user-common-types";
import AuthUserService from "../service/auth-user-service";
import ValidationController from "./validation-controller";

export default class AuthUserController extends ValidationController {
    _authUserService=new AuthUserService();
    
    public register = async (authuser:userType) =>{
        const {name,email,password}=authuser;
        const fieldsToValidate:string[] = [this.fieldNames.name,this.fieldNames.email,this.fieldNames.password];
        this.validateAndThrowError({fieldsToValidate,name,email,password})
        return await this._authUserService.register(authuser)
    };
    public verifyRegisteredOtp = async (email:string,otp:string) =>{
        const fieldsToValidate=[this.fieldNames.email];
        this.validateAndThrowError({fieldsToValidate,email});
        return await this._authUserService.verifyOtp(email,otp)
    };
    public login = async (email:string,password:string) =>{
        const fieldsToValidate=[this.fieldNames.email];
        this.validateAndThrowError({fieldsToValidate,email})
        return await this._authUserService.login(email,password)
    }
}