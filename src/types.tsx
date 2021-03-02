import actionTypes from './store/actionTypes';

export interface User {
    id : number,
    imageUrl : string,
    name : string,
    designation : string,
    location : string,
    email : string,
    phone : number,
    tasks : number[],
}

export class User implements User {}

export type UsersArray = User[];

export interface UserContainerProps {
    users: UsersArray,
}

export interface UserOverlayProps {
    user: User,
    handleClose() : void,
    handleSave(user : User) : void,
    handleDelete(id : number) : void,
}

export interface UserImageurlProps {
    imageUrl : string,
    handleImageChange(url : string) : void,
    userName : string,
}

export interface State {
    users : User[],
    tasks : Task[],
    cities : string[],
}

export class State implements State {}

export interface Stage {
    [stageName: string] : boolean,
}

export type StatusNumbers = 0 | 1 | 2 | 3;

export interface Task {
    taskId : number,
    imageUrl : string,
    title : string,
    assignee : number,
    status : StatusNumbers,
    stages : Stage,
    dueDate : string,
}

export class Task implements Task {}

export type TasksArray = Task[];

export interface UserColumnTypes {
    user : User,
    editClickHandle(task : Task) : void,
    userId : number,
}

export interface TaskAssigneeTypes {
    users: User[],
    assignee : string,
    handleAssigneeChange(assignee : string) : void,
}

export type Status = "Not started" | "In-progress" | "On hold" | "Completed";

export interface TaskOverlayTypes {
    task: Task,
    users : User[],
    handleClose() : void,
    handleSave(task : Task) : void,
    handleDelete(taskId : number) : void,
}

export interface City {
    objectId: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  }
  
 export interface TaskFields {
    imageUrl : string,
    title : string,
    assigneeName : string,
    status: string,
    dueDate: string,
}

export interface UserFields {
    imageUrl : string,
    name : string,
    designation : string,
    location : string,
    email : string,
    phone : string,
}

export type AddUserAction = {
    type : typeof actionTypes.ADD_USER,
    payload : User,
}

export type RemoveUserAction = {
    type : typeof actionTypes.REMOVE_USER,
    payload : number,
}

export type AddTaskAction = {
    type : typeof actionTypes.ADD_TASK,
    payload : Task,
}

export type RemoveTaskAction = {
    type : typeof actionTypes.REMOVE_TASK,
    payload : number,
} 

export type UpdateUserAction = {
    type : typeof actionTypes.UPDATE_USER,
    payload : {id : number , user : User}
}

export type UpdateTaskAction = {
    type : typeof actionTypes.UPDATE_TASK,
    payload : {taskId : number , task : Task}
}

export type Action = AddUserAction | RemoveUserAction | AddTaskAction | RemoveTaskAction | UpdateUserAction | UpdateTaskAction;