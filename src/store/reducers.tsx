import { SVGAttributes, useState } from "react";
import { act } from "react-dom/test-utils";
import Tasks from "../Tasks";
import actions from "./actions";
import {userObject} from '../Team'
import {taskObject} from '../Tasks'
import { stat } from "fs";

//type definitions start here
interface stateType {
    users : userObject[],
    tasks : taskObject[],
    cities : string[],
}

class stateType implements stateType {}

type addUserAction = {
    type : "ADD_USER",
    payload : userObject,
}

type removeUserAction = {
    type : "REMOVE_USER",
    payload : number,
}

type addTaskAction = {
    type : "ADD_TASK",
    payload : taskObject,
}

type removeTaskAction = {
    type : "REMOVE_TASK",
    payload : number,
} 

type updateUserAction = {
    type : "UPDATE_USER",
    payload : {id : number , user : userObject}
}

type updateTaskAction = {
    type : "UPDATE_TASK",
    payload : {taskId : number , task : taskObject}
}

type actionType = addUserAction | removeUserAction | addTaskAction | removeTaskAction | updateUserAction | updateTaskAction;
//type definitions end here

const rootReducer = (state = new stateType(), action: actionType) : stateType => {
    switch (action.type) {
        case "ADD_USER" :
            return (
                {
                    ...state,
                    users: [...state.users,action.payload],
                    cities : state.cities,
                }
            )

        case "REMOVE_USER" :
            console.log(action);
            return (
                {
                    users: state.users.filter(user => user.id != action.payload),
                    tasks: state.tasks.filter(task => task.assignee != action.payload),
                    cities : state.cities,
                }
            )

        case "ADD_TASK" : {
            let user = state.users.find(user => user.id == action.payload.assignee);
            if(typeof user != "undefined")
                user.tasks.push(action.payload.taskId);
            return (
                {
                    users: state.users,
                    tasks: [...state.tasks,action.payload],
                    cities : state.cities,
                }
            )
        }

        case "REMOVE_TASK" : {
            let task = state.tasks.find(task => task.taskId == action.payload) as taskObject;
            let user = state.users.find(user => user.id == task.assignee);
            if(typeof user != "undefined")
            {
                user.tasks = user.tasks.filter(taskId => taskId != action.payload);
            }
            return (
                {
                    users: state.users,
                    tasks: state.tasks.filter(task => task.taskId != action.payload),
                    cities : state.cities,
                }
            )
        }

        case "UPDATE_USER" : {
            let ind = state.users.findIndex(user => user.id == action.payload.id)
            return (
                {
                    ...state,
                    users: [...state.users.slice(0,ind),action.payload.user,...state.users.slice(ind+1)],
                    cities : state.cities,
                }
            )
        }

        case "UPDATE_TASK" : {
            let ind = state.tasks.findIndex(task => task.taskId == action.payload.taskId);
            if(state.tasks[ind].assignee == action.payload.task.assignee) {
                return (
                    {
                        ...state,
                        tasks: [...state.tasks.slice(0,ind),action.payload.task,...state.tasks.slice(ind+1)],
                        cities : state.cities,
                    }
                )
            }
            else {
                let user = state.users.find(user => user.id == state.tasks[ind].assignee);
                if(typeof user != "undefined")
                    user.tasks = user.tasks.filter(taskId => taskId != action.payload.taskId);
                let newUser = state.users.find(user => user.id == action.payload.task.assignee);
                if(typeof newUser != "undefined")
                    newUser.tasks = [...newUser.tasks, action.payload.taskId];
                console.log(state.users);
                return (
                    {
                        users: state.users,
                        tasks: [...state.tasks.slice(0,ind),action.payload.task,...state.tasks.slice(ind+1)],
                        cities : state.cities,
                    }
                )
            }
        }

        default : return state;
    }
}

export default rootReducer;