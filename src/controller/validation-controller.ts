import { Types } from "mongoose";
import BaseValidationController from "./base-validation-controller";

export default class ValidationController extends BaseValidationController {
    validateName=(name:string)=>{
        name=name?.trim()
        if(!name || name?.length===0 || !this.isValidName(name))
        throw new Error(`name is mandatory enter valid name`)
    }
    validateEmail=(email:string)=>{
        email=email?.trim()
        if(!email || email?.length===0 || !this.isValidEmail(email))
        throw new Error(`email is mandatory enter valid email`)
    }
    validatePassword=(pass:string)=>{
        if(!this.isValidpassword(pass))
        throw new Error(`password is mandatory enter valid password`)
    }
    validateTitle=(title:string)=>{
        title=title?.trim()
        if(!title || title?.length===0 || !this.isValidTitle(title))
        throw new Error(`title is mandatory enter valid title`)
    }
    validateDescription=(desc:string)=>{
        desc=desc?.trim()
        if(!desc || desc?.length===0 || !this.isValidDescription(desc))
        throw new Error(`desc is mandatory enter valid desc`)
    }
    validatePriority=(priority:string)=>{
        if(!this.isValidPriority(priority))
        throw new Error(`Enter valid priority. priority can only be low medium high`)
    }
    validateStatus=(status:string)=>{
        if(!this.isValidStatus(status))
        throw new Error(`status is mandatory enter valid status`)
    }
    validateDate=(date:string)=>{
        const validDateRegx=/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        if(!validDateRegx.test(date))
        throw new Error(`Enter a valid date.valid date can be of form dd-mm-yyyy`)
    }
    validateMongooseId=(id:string)=>{
        if(!Types.ObjectId.isValid(id))
        throw new Error(`Enter a valid mongoose id`)
    }
}