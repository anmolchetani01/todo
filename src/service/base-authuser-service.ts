import AuthUser from "../model/auth_user"

export default class BaseAuthUserService {
    public getAuthUser = async(email:string) =>{
        return (await AuthUser.findOne({email}).select("+password"));
    };
    public getAuthUserById = async(id)=>{
        return await AuthUser.findById(id)
    }
    public preventExistingEmailUse = async (email:string)=>{
        const existinguser=await this.getAuthUser(email);
        if(existinguser)
        throw new Error(`user already exist using this email:${email}`)
    }
    public updateVerifiedAuthUser = async (authuser:any)=>{
        authuser.is_active=true;
        authuser.is_verified=true;
        authuser.updated_at=Date.now();
        authuser.updated_by=authuser._id;
        await authuser.save();
    };
    
}