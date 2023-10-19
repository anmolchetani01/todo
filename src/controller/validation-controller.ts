import BaseValidationController from "./base-validation-controller";

type validationInput = {
    fieldsToValidate?:string[];
    name?:string;
    email?:string;
    password?:string;
    title?:string;
    description?:string;
    priority?:string;
    status?:string;
}

export default class ValidationController extends BaseValidationController {
    fieldNames = {
        name:"name",
        email:"email",
        password:"password",
        title:'title',
        description:'description',
        priority:'priority',
        status:'status',
    }
    validateAndThrowError = ({
        fieldsToValidate,
        name,
        email,
        password,
        title,
        description,
        priority,
        status
    }:validationInput)=>{
        console.log(`fieldstovalidate in validation-controller ${fieldsToValidate}`)
        if(fieldsToValidate.includes(this.fieldNames.name) && !this.isValidName(name))
        {
            console.log(`in validation-controller  ${name} is invalid name please enter a valid name`)
            throw new Error(`invalid name`)
        }
        if(fieldsToValidate.includes(this.fieldNames.email) && !this.isValidEmail(email))
        {
            console.log(`in validation-controller  ${email} is invalid email please enter a valid email`)
            throw new Error(`invalid email`)
        }
        if(fieldsToValidate.includes(this.fieldNames.password) && !this.isValidpassword(password))
        {
            console.log(`in validation-controller  ${password} is invalid password please enter a valid password`)
            throw new Error(`invalid password`)
        }
        if(fieldsToValidate.includes(this.fieldNames.title) && !this.isValidTitle(title))
        {
            console.log(`in validation-controller  ${title} is invalid title please enter a valid title`)
            throw new Error(`invalid title`)
        }
        if(fieldsToValidate.includes(this.fieldNames.description) && !this.isValidDescription(description))
        {
            console.log(`in validation-controller  ${description} is invalid description please enter a valid description`)
            throw new Error(`invalid description`)
        }
        if(fieldsToValidate.includes(this.fieldNames.priority) && !this.isValidPriority(priority))
        {
            console.log(`in validation-controller  ${priority} is invalid priority please enter a valid priority`)
            throw new Error(`invalid priority`)
        }
        if(fieldsToValidate.includes(this.fieldNames.status) && !this.isValidStatus(status))
        {
            console.log(`in validation-controller  ${status} is invalid status please enter a valid status`)
            throw new Error(`invalid status`)
        }

    }
}