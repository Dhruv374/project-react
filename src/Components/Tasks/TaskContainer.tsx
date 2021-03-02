import {useSelector , useDispatch} from "react-redux";
import {State , Task , User} from "../../types";
import {useMemo, useState} from "react";
import actions from "../../store/actions";
import TaskOverlay from "./TaskOverlay";
import UserColumn from './UserColumn';

export const taskMap = new Map();
export default function TasksContainer() : React.ReactElement {

    const tasks = useSelector((state : State) => state.tasks);
    const users = useSelector((state : State) => state.users);
    const dispatch = useDispatch();

    const [overlay,setOverlay] = useState<Task | null>(null);

    function handleClose() : void {
        // for animation
        const elem = document.querySelector('.tasksOverlay');
        if(elem)
            elem.classList.add('closeOverlay');
        setTimeout(() => setOverlay(null),500);
    }

    function handleSave(newTask : Task) : void {
        if(newTask.taskId == -1) {
            newTask.taskId = tasks[tasks.length-1].taskId+1;
            dispatch(actions.addTask(newTask));
        }
        else {
            dispatch(actions.updateTask(newTask.taskId,newTask));
        }
        taskMap.set(newTask.taskId,newTask);
        const elem = document.querySelector('.tasksOverlay');
        if(elem)
            elem.classList.add('closeOverlay');
        setTimeout(() => setOverlay(null),500);
    }
    
    function handleDelete(id : number) : void {
        dispatch(actions.removeTask(id));
        setOverlay(null);
    }

    tasks.forEach((element: Task) : void => {
        taskMap.set(element.taskId,element);
    });

    const modal = (overlay==null) ? null : <TaskOverlay task={overlay} users={users} handleClose={handleClose} handleSave={handleSave} handleDelete={handleDelete}/>;

    return (
        <>
            <div className="board-lists">
                {users.map(function (user : User) {
                    return <UserColumn key={user.id} user={user} editClickHandle={(task) => setOverlay(task)} userId={user.id}/>
                })}
            </div>
            {modal} 
        </>
    )
}