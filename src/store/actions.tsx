import {User , Task , AddUserAction , AddTaskAction , RemoveUserAction , RemoveTaskAction , UpdateUserAction , UpdateTaskAction} from '../types'
import actionTypes from './actionTypes';

const addUser = (user : User) : AddUserAction => {
    return {
        type: actionTypes.ADD_USER,
        payload: user,
    }
}

const removeUser = (id : number) : RemoveUserAction => {
    return {
        type: actionTypes.REMOVE_USER,
        payload: id,
    }
}

const addTask = (task : Task) : AddTaskAction => {
    return {
        type: actionTypes.ADD_TASK,
        payload: task,
    }   
}

const removeTask = (taskId : number) : RemoveTaskAction => {
    return {
        type: actionTypes.REMOVE_TASK,
        payload: taskId,
    }
}

const updateUser = (id : number,user : User) : UpdateUserAction => {
    return {
        type: actionTypes.UPDATE_USER,
        payload: {
            id,
            user,
        }
    }
}

const updateTask = (taskId : number,task : Task) : UpdateTaskAction => {
    return {
        type: actionTypes.UPDATE_TASK,
        payload: {
            taskId,
            task,
        }
    }
}

const actions = {
    addUser,
    removeUser,
    addTask,
    removeTask,
    updateUser,
    updateTask,
}

export default actions;