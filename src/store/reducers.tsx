import {Task , User , State , Action} from '../types';
import actionTypes from './actionTypes';

//type definitions start here

//type definitions end here

const rootReducer = (state = new State(), action: Action) : State => {
    switch (action.type) {
        case actionTypes.ADD_USER :
            return (
                {
                    ...state,
                    users: [...state.users,action.payload],
                    cities : state.cities,
                }
            )

        case actionTypes.REMOVE_USER :
            console.log(action);
            return (
                {
                    users: state.users.filter(user => user.id != action.payload),
                    tasks: state.tasks.filter(task => task.assignee != action.payload),
                    cities : state.cities,
                }
            )

        case actionTypes.ADD_TASK : {
            const user = state.users.find(user => user.id == action.payload.assignee);
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

        case actionTypes.REMOVE_TASK : {
            const task = state.tasks.find(task => task.taskId == action.payload) as Task;
            const user = state.users.find(user => user.id == task.assignee);
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

        case actionTypes.UPDATE_USER : {
            const ind = state.users.findIndex(user => user.id == action.payload.id)
            return (
                {
                    ...state,
                    users: [...state.users.slice(0,ind),action.payload.user,...state.users.slice(ind+1)],
                    cities : state.cities,
                }
            )
        }

        case actionTypes.UPDATE_TASK : {
            const ind = state.tasks.findIndex(task => task.taskId == action.payload.taskId);
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
                const user = state.users.find(user => user.id == state.tasks[ind].assignee);
                if(typeof user != "undefined")
                    user.tasks = user.tasks.filter(taskId => taskId != action.payload.taskId);
                const newUser = state.users.find(user => user.id == action.payload.task.assignee);
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