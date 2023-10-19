import Task from "../model/task-manager";
import { convertDate } from "../common/date";
import {taskType} from "../common/task-common-types"
import BaseAuthUserService from "./base-authuser-service";
import AuthUser from "../model/auth_user";
import {Types} from "mongoose"


export default class TaskManager {
    _baseAuthuserService = new BaseAuthUserService()
    public createTask = async (createfields:taskType,id1:string) =>{
        // const dd=convertDate(due_date)
        console.log(id1)
        const id=new Types.ObjectId(id1)
        console.log(id)
        const isUserAuthorized =await  this._baseAuthuserService.getAuthUserById(id);
        const {
            title,
            description,
            priority,
            due_date,
            assignee,
            status
        }=createfields
        const newTask = new Task({
            title,
            description,
            priority,
            due_date:convertDate(due_date),
            assignee,
            status,
            created_by:isUserAuthorized._id,
            updated_by:isUserAuthorized._id
        })
        await newTask.save();
        return newTask;
    };

    public getTaskById = async (id:string) =>{
        const task=await Task.findById(id);
        if(!task)
        throw new Error(`task don't exists`)
        return task;
    };

    // public getAllTaskOfAssignee = async (id:string):Promise<any>=>{
    //     const tasks = await Task.find({assignee:id});
    //     if(tasks.length===0)
    //     throw new Error(`task not exist for user`);
    //     return tasks;

    // };

    public getAllTask = async ():Promise<any>=>{
        const tasks = await Task.find();
        if(tasks.length===0)
        throw new Error(`task not exist for user`);
        return tasks;

    };

    public editTask = async (editBy:string,task_id:string,updateFields:taskType)=>{
        const updatefields:any={...updateFields}
        if(updatefields.due_date)
        updatefields.due_date=convertDate(updateFields.due_date);
        updatefields.updated_at=new Date();
        const updatequery={$set:updatefields};
        const filter = {$or:[{
            created_by:editBy
        },
        {
            assignee:editBy
        }
        ],
    _id:task_id};
        const result=await Task.findOneAndUpdate(filter,updatequery,{new:true});
        if(!result)
        throw new Error(`user is not authorized`)
        console.log(`in task service `,result)
        return result;
    };
    public assigneetask = async (taskId:string,assigneeId:string,editBy:string) =>{
        const filter = {$or:[
            {
                created_by:editBy
            },
            {
                assignee:editBy
            }
        ],
         _id:taskId};
        const updatequery={$set:{
            assignee:assigneeId,
            updated_by:editBy,
            updated_at:Date.now()
        }}
        const task=await Task.findOneAndUpdate(filter,updatequery);
        if(!task)
        throw new Error(`user cant assignee task to this user`)
        return task;
    };
    public changeStatus = async (id:string,status:string,updated_by:string) =>{
        const task=await Task.findOne({$or:[{
            created_by:updated_by
        },
        {
            assignee:updated_by
        }
        ],
        _id:id
    });
        if(!task)
        throw new Error(`user cant update status`)
        if(status==="inprogress" && task.status==="todo")
        task.status="inprogress";
        else if(status==="done" && task.status==="inprogress")
        task.status="done"
        else
        throw new Error(`transition cant be done`)
        task.updated_by=new Types.ObjectId(updated_by);
        task.updated_at = new Date();
        task.save()
        return task;
    }
}