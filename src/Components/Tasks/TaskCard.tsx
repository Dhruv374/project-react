import React from "react";
import {Task} from '../../types';
import TaskImage from './TaskImage';
import TaskInfo from './TaskInfo';


const TaskCard = React.memo(function({task,editClick} : {task : Task , editClick : (task : Task) => void}) : React.ReactElement {

    function onEdit() : void {
        editClick(task);
    }

    return (
        <div className="card" onClick={onEdit}>
            <TaskImage source={task.imageUrl} />
            <div className="taskTitle">
                {task.title}
            </div>
            <hr className="titleLineBreaks" />
            <TaskInfo task={task} />
        </div>
    )
});

export default TaskCard;