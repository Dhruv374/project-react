import {Task, UserColumnTypes} from '../../types';
import React , {useState , useCallback, useMemo} from "react";
import withSort from "../WithSortHoc";
import UserTasks from "./UserTasks";
import { taskMap } from './TaskContainer';

const UserTasksSort = withSort((UserTasks as unknown) as typeof React.Component ,'status');
export default function UserColumn({user,editClickHandle,userId}: UserColumnTypes) : React.ReactElement {

    const [sort,setSort] = useState("ASC");
    const editClick = useCallback((task) : void => editClickHandle(task),[]);
    const userTasks = useMemo(() : Task[] => {
        const arr: Task[] = []
        user.tasks.forEach((taskId):number => arr.push(taskMap.get(taskId)));
        return arr;
    },[user.tasks.length]);
    
    function handleSort() : void {
        if(sort == "ASC") {
            setSort("DESC");
        }
        else {
            setSort("ASC");
        }
    }
    
    return (
        <section className="board-list">
            <div className="tasksAdd" onClick={editClick.bind(null,{assignee: userId,imageUrl: "assets/default.png",status:0} as Task)}>
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </div>
            <div className="tasksAdd taskSort" onClick={handleSort}>
                <i className={"fa " + ((sort == "ASC") ? "fa-arrow-circle-up":"fa-arrow-circle-down")} aria-hidden="true"></i>
            </div>
            <div className="list-title">
                {user.name}
            </div>
            <UserTasksSort userTasks={userTasks} editClick = {editClick} type={sort}/>
        </section>
    );
}