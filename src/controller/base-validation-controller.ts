export default class BaseValidation {
    public isValidName = (name) =>{
        const validnameregx=/^[A-Za-z- ]+$/
        return validnameregx.test(name)
    }
    public isValidEmail = (email) =>{
        const validemailregx=/^[\w.-]+@[\w.-]+\.\w+$/
        return validemailregx.test(email)
    }
    public isValidpassword = (password) =>{
        const validpasswordregx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!])[A-Za-z\d@#$!]{8,}$/
        return validpasswordregx.test(password)
    }
    public isValidTitle = (title) =>{
        const validtitleregx=/^[\w@#$,.*\s]+$/i
        return validtitleregx.test(title)
    }
    public isValidDescription = (description) =>{
        const validdescriptionregx=/^[A-Za-z@#$?!*\s]*$/i
        return validdescriptionregx.test(description)
    }
    public isValidPriority = (priority) =>{
        priority?.toLowerCase()
        if(priority==='low' ||priority==='medium'||priority==='high')
        return true;
        return false;
    }
    public isValidStatus = (status) =>{
        status?.toLowerCase()
        if(status==='todo' ||status==='inprogress'||status==='done')
        return true;
        return false;
    }

}