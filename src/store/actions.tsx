import {userObject} from '../Team'
import {taskObject} from '../Tasks'

const addUser = (user : userObject) => {
    return {
        type: "ADD_USER",
        payload: user,
    }
}

const removeUser = (id : number) => {
    return {
        type: "REMOVE_USER",
        payload: id,
    }
}

const addTask = (task : taskObject) => {
    return {
        type: "ADD_TASK",
        payload: task,
    }   
}

const removeTask = (taskId : number) => {
    return {
        type: "REMOVE_TASK",
        payload: taskId,
    }
}

const updateUser = (id : number,user : userObject) => {
    return {
        type: "UPDATE_USER",
        payload: {
            id,
            user,
        }
    }
}

const updateTask = (taskId : number,task : taskObject) => {
    return {
        type: "UPDATE_TASK",
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