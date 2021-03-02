import {useCallback, useState} from "react";

export default function TaskDate({date,handleDateChange} : {date: string , handleDateChange : (date : string) => void}) : React.ReactElement {
    const [taskDate,setTaskDate] = useState(date);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        setTaskDate(e.target.value);
        handleDateChange(e.target.value);
    },[]);

    return (
        <div className="taskDateOverlay">
            <label htmlFor="taskDateInput"><i className="fa fa-clock-o" aria-hidden="true"></i> Due date :- </label>
            <input value={taskDate} onChange={handleChange} type="date" id="taskDateInput" name="taskDateInput" placeholder="dd/mm/yyyy" />  
        </div>
    )
}