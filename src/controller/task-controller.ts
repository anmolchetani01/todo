import { taskType } from "../common/task-common-types";
import TaskManager from "../service/task-service";
// import validationController from "./validation-controller"
import ValidationController from "./validation-controller";
import { Types } from "mongoose";

export default class TaskManagerController extends ValidationController {
    private _taskManagerService = new TaskManager()

    public createTask=async (createfields:taskType,userid:string)=>{
        const {
            title,
            desc,
            priority,
            due_date,
            assignee,
            status
        }=createfields;
        this.validateTitle(title);
        this.validateDescription(desc);
        this.validateDate(due_date);
        this.validatePriority(priority);
        this.validateStatus(status);
        return await this._taskManagerService.createTask(createfields,userid)
    }
    public getTask =async (id:string) => {
        if(Types.ObjectId.isValid(id))
        return await this._taskManagerService.getTaskById(id)
        throw new Error(`id is invalid`)
    }
    public editTask = async (editBy:string,task_id:string,updateFields:taskType)=>{
        if(updateFields.title)
        this.validateTitle(updateFields.title);
        if(updateFields.desc)
        this.validateDescription(updateFields.desc);
        if(updateFields.priority)
        this.validatePriority(updateFields.priority);
        if(updateFields.status)
        this.validateStatus(updateFields.status);
        return await this._taskManagerService.editTask(editBy,task_id,updateFields)
    };

    public getAllTask = async () =>{
        return await this._taskManagerService.getAllTask()
    };

    public assigneetask = async (taskId:string,assigneeId:string,editBy:string) =>{
        if(Types.ObjectId.isValid(taskId)&&Types.ObjectId.isValid(assigneeId)&&Types.ObjectId.isValid(editBy))
        return await this._taskManagerService.assigneetask(taskId,assigneeId,editBy);
        throw new Error(`invalid mongoose id`);
    };
    public changeStatus = async (id:string,status:string,updated_by:string)=>{
        this.validateStatus(status)
        if(!Types.ObjectId.isValid(updated_by))
        throw new Error(`invalid update id`)
        return await this._taskManagerService.changeStatus(id,status,updated_by)
    }
}