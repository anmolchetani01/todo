import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        maxlength:500,
        minLength:5
    },
    priority:{
        type:String,
        enum:["high","medium","low"]
    },
    due_date:{
        type:Date
    },
    assignee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AuthUser'
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AuthUser',
    },
    status:{
        type:String,
        enum:["todo","inprogress","done"],
        default:"todo"
    },
    updated_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AuthUser',
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
})

export default mongoose.model('Task',taskSchema)