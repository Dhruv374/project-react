import react,{useCallback, useState} from "react";
import { Link } from 'react-router-dom';

export default function Navbar() : React.ReactElement {

    const [task,setTask] = useState<boolean>(true);

    const activateTasks = useCallback(() : void => setTask(true),[]);
    const activateTeam = useCallback(() : void => setTask(false),[]);

    return (
        <div className="topnav">
            <Link to={'/tasks'} onClick={activateTasks} className={task ? "active" : ""}>TASKS</Link>
            <Link to={'/team'} onClick={activateTeam} className={task ? "" : "active"}>TEAM</Link>
        </div>
    );
}