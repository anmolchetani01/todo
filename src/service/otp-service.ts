import Otp from "../model/otp"

export default class OtpService {
    public getOtpData = async (email:string,otp:string) =>{
        const result = await Otp.find({email:email,otp:otp});
        return result;
    }
}