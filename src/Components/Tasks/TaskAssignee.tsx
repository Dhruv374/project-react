import {useCallback, useState} from "react";
import { TaskAssigneeTypes } from "../../types";

export default function TaskAssignee({users,assignee,handleAssigneeChange} : TaskAssigneeTypes) : React.ReactElement {

    const [taskAssignee,setTaskAssignee] = useState(assignee);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLSelectElement>) : void {
        setTaskAssignee(e.target.value);
        handleAssigneeChange(e.target.value);
    },[]);

    return (
        <div className="taskUserOverlay">
            <label htmlFor="taskUserInput"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Assigee :- </label>
            <select id="taskUserInput" value={taskAssignee} onChange={handleChange}>
                {users.map(function(user) {
                    return (<option value={user.name} key={user.id}>{user.name}</option>);
                })}
            </select>  
        </div>
    )
}