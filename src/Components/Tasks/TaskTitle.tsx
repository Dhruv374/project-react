import {useCallback, useState} from 'react';

export default function TaskTitle({title,handleTitleChange} : {title: string, handleTitleChange : (title : string) => void}) : React.ReactElement {
    const [taskTitle,setTaskTitle] = useState(title);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        setTaskTitle(e.target.value);
        handleTitleChange(e.target.value);
    },[]);

    return (
        <div className="taskTitleOverlay">
            <label htmlFor="taskTitleInput"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Title :- </label>
            <input value={taskTitle} onChange={handleChange} type="text" id="taskTitleInput" name="taskTitleInput" />  
        </div>
    )
}