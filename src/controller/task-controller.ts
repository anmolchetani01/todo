import { taskType } from "../common/task-common-types";
import TaskManager from "../service/task-service";
// import validationController from "./validation-controller"
import ValidationController from "./validation-controller";
import { Types } from "mongoose";

export default class TaskManagerController extends ValidationController {
    private _taskManagerService = new TaskManager()

    public createTask=async (createfields:taskType,id:string)=>{
        const fieldstovalidate:string[]=[
            this.fieldNames.title,
            this.fieldNames.description,
            this.fieldNames.priority,
            this.fieldNames.status
        ]
        const {
            title,
            description,
            priority,
            status
        }=createfields
        this.validateAndThrowError({ fieldsToValidate:fieldstovalidate ,title,description,priority,status})
        return await this._taskManagerService.createTask(createfields,id)
    }
    public getTask =async (id:string) => {
        if(Types.ObjectId.isValid(id))
        return await this._taskManagerService.getTaskById(id)
        throw new Error(`id is invalid`)
    }
    public editTask = async (editBy:string,task_id:string,updateFields:taskType)=>{
        const fieldstovalidate:string[]=[];
        if(updateFields.title)
        fieldstovalidate.push('title');
        if(updateFields.description)
        fieldstovalidate.push('description');
        if(updateFields.priority)
        fieldstovalidate.push('priority');
        if(updateFields.status)
        fieldstovalidate.push('status');
        this.validateAndThrowError({
            fieldsToValidate:fieldstovalidate,
            title:updateFields.title,
            description:updateFields.description,
            priority:updateFields.priority,
            status:updateFields.status
        })
        return await this._taskManagerService.editTask(editBy,task_id,updateFields)
    };

    public getAllTask = async () =>{
        return await this._taskManagerService.getAllTask()
    };

    public assigneetask = async (taskId:string,assigneeId:string,editBy:string) =>{
        if(Types.ObjectId.isValid(taskId)&&Types.ObjectId.isValid(assigneeId)&&Types.ObjectId.isValid(editBy))
        return await this._taskManagerService.assigneetask(taskId,assigneeId,editBy);
        throw new Error(`invalid id`);
    };
    public changeStatus = async (id:string,status:string,updated_by:string)=>{
        const fieldsToValidate:string[]=[this.fieldNames.status];
        this.validateAndThrowError({fieldsToValidate,status})
        if(!Types.ObjectId.isValid(updated_by))
        throw new Error(`invalid update id`)
        return await this._taskManagerService.changeStatus(id,status,updated_by)
    }
}