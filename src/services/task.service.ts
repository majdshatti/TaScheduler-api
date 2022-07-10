// Models
import Task from "../model/Task";

// Interface
import ITask from "../interfaces/task.interface";
import IResponse from "../interfaces/response.interface";

export const createTask = (data: ITask): Promise<ITask> | IResponse => {
    try{
        return Task.create({
            name: data.name,
            description: data.description
        })
    } catch (error: any){
        const errorObject: IResponse = {
            success: false,
            message: error.message
        }

        return errorObject
    }
}