import {TasksArray} from "../../types";
import {Task} from "../../types";
import TaskCard from './TaskCard';


export default function UserTasks({userTasks,editClick} : {userTasks : TasksArray , editClick : (task : Task) => void}) : React.ReactElement {
    return(
        <>
            {userTasks.map(task => <TaskCard task={task} key={task.taskId} editClick={editClick}/>)}
        </>
    )
}