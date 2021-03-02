import {Status} from '../../types';
import {useCallback, useState} from "react";

export default function TaskStatus({status,handleStatusChange} : {status : Status , handleStatusChange: (status : Status) => void}) : React.ReactElement {

    const [taskStatus,setTaskStatus] = useState(status);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLSelectElement>) : void {
        setTaskStatus(e.target.value as Status);
        handleStatusChange(e.target.value as Status);
    },[]);
    
    return (
        <div className="taskStatusOverlay">
            <label htmlFor="taskSatusInput"><i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                {` Status :-`}</label>
            <select id="taskStatusInput" value={taskStatus} onChange={handleChange}>
                <option value="Not started">Not started</option>
                <option value="In-progress">In-progress</option>
                <option value="On hold">On hold</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    );
}