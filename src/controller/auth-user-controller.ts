import { userType } from "../common/user-common-types";
import AuthUserService from "../service/auth-user-service";
import ValidationController from "./validation-controller";

export default class AuthUserController extends ValidationController {
    _authUserService=new AuthUserService();
    
    public register = async (authuser:userType) =>{
        const {name,email,password}=authuser;
        this.validateName(name);
        this.validateEmail(email);
        this.validatePassword(password);
        return await this._authUserService.register(authuser)
    };
    public verifyRegisteredOtp = async (email:string,otp:string) =>{
        this.validateEmail(email);
        return await this._authUserService.verifyOtp(email,otp)
    };
    public login = async (email:string,password:string) =>{
        this.validateEmail(email);
        return await this._authUserService.login(email,password)
    }
}