import {Request,Response,NextFunction} from 'express'
import TaskManagerController from "../controller/task-controller";
import {taskType} from "../common/task-common-types";


const _taskManagerController = new TaskManagerController()

export const createTask = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {
            id,
            title,
            description,
            priority,
            due_date,
            assignee,
            status
        }=req.body;
        const createfields:taskType = {
            title,
            description,
            priority,
            due_date,
            assignee,
            status
        }
        const result = await _taskManagerController.createTask(createfields,id);
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getTask = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const id=req.params.id
        const result = await _taskManagerController.getTask(id);
        res.status(200).send(result);
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const editTask = async (req:Request,res:Response,next:NextFunction) =>{
    try{
        const editBy=req.body.updated_by;
        const taskid=req.params.id;
        const {
            title,
            description,
            priority,
            due_date,
            assignee,
            status
        } = req.body;

        const updatefields:taskType={
            title,
            description,
            priority,
            due_date,
            assignee,
            status
        };
        const result = await _taskManagerController.editTask(editBy,taskid,updatefields);
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
};

export const getAllTask = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result=await _taskManagerController.getAllTask();
        res.status(200).send(result);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send(error.message);
    }
};

export const assigneeTask = async (req:Request,res:Response) =>{
    try{
        const taskId=req.params.id
        const {assignee:assigneeId,updated_by:editBy}=req.body
        const result = await _taskManagerController.assigneetask(taskId,assigneeId,editBy)
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
};

export const changeStatus = async (req:Request,res:Response) =>{
    try{
        const id=req.params.id;
        const {status,updated_by}=req.body;
        const result = await _taskManagerController.changeStatus(id,status,updated_by)
        res.status(200).send(result)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).send(error.message)
    }
}