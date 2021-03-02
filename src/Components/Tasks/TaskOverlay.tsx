import {TaskOverlayTypes , Status , Task , StatusNumbers , Stage, State , TaskFields, User} from '../../types';
import {useEffect , useRef , useMemo , useState , useCallback } from "react";
import ReactDOM from "react-dom";
import TaskImageurl from "./TaskImageurl";
import TaskTitle from "./TaskTitle";
import TaskAssignee from "./TaskAssignee";
import StagesDisplay from "./StagesDisplay";
import TaskStatus from "./TaskStatus";
import TaskDate from './TaskDate';
import { arrayOf, func } from 'prop-types';

const statusMapping = ["Not started" , "In-progress" , "On hold" , "Completed"];
const mapStatus = {
    "Not started" : 0,
    "In-progress" : 1,
    "On hold" : 2,
    "Completed" : 3,
}

export default function TaskOverlay({task,users,handleClose,handleSave,handleDelete} : TaskOverlayTypes) : React.ReactElement {
    
    const selectedIndex = useMemo(() : number => users.findIndex((user) : boolean => user.id == task.assignee),[task]);
    const [taskStages,setTaskstages] = useState(task.stages);

    const elem = useRef(document.createElement('div'));
    useEffect(function() {
        elem.current.classList.add('tasksOverlayContainer');
        document.body.appendChild(elem.current);

        return function() {
            document.body.removeChild(elem.current);
        }
    },[]);

    const taskFields : TaskFields = {
        imageUrl: task.imageUrl || "assets/default.png",
        title: task.title || "",
        assigneeName: users[selectedIndex].name,
        status: statusMapping[task.status],
        dueDate: task.dueDate || "",
    }

    function onAction(prop: "imageUrl" | "title" | "assigneeName" | "status" | "dueDate" , value: string) : void {
        taskFields[prop] = value;
    }

    const deleteStageHandle = useCallback(function (stageName : string) : void {
        const stagesArray = Object.entries(taskStages);
        const newStagesArray = stagesArray.filter((stage) => stage[0] != stageName);
        const newStages: Stage = Object.fromEntries(newStagesArray);
        setTaskstages(newStages);
    },[])
    
    function onAddStage() : void {
        const stageName = prompt("Enter stage name:- ","");
        if(stageName=="" || stageName == null)
        {
            return;
        }
        const newStages: Stage = {};
        Object.assign(newStages , taskStages);
        newStages[stageName] = false;
        setTaskstages(newStages);
    }

    function onSave() : void {
        const currentAssigneeIndex = users.findIndex((user) => user.name == taskFields.assigneeName);
        const newTask: Task = new Task();
        if(isNaN(task.taskId)) {
            newTask.taskId = -1;
        }
        else {
            newTask.taskId = task.taskId;
        }
        newTask.imageUrl = taskFields.imageUrl;
        newTask.title = taskFields.title;
        newTask.assignee = users[currentAssigneeIndex].id;
        newTask.status = mapStatus[taskFields.status as Status] as StatusNumbers;
        newTask.stages = {};
        Object.assign(newTask.stages , taskStages);
        newTask.dueDate = taskFields.dueDate;
        handleSave(newTask);
    }

    function onDelete() : void {
        if(isNaN(task.taskId)) {
            handleClose();
        }
        else {
            const ind = users[selectedIndex].tasks.findIndex((taskId) => taskId == task.taskId);
            users[selectedIndex].tasks.splice(ind,1);
            handleDelete(task.taskId);
        }
    }


    return ReactDOM.createPortal (
            <div className="tasksOverlay">
                <div className="closeButton" onClick={handleClose}>
                X
                </div>

                <TaskImageurl image={taskFields.imageUrl} handleImageChange={onAction.bind(null,'imageUrl')} />
                <TaskTitle title={taskFields.title} handleTitleChange={onAction.bind(null,'title')} />
                <TaskAssignee users={users} assignee={taskFields.assigneeName} handleAssigneeChange={onAction.bind(null,'assigneeName')} />
                <div className="taskStagesOverlay">
                    <label><i className="fa fa-check-square-o" aria-hidden="true"></i> Stages :- </label>
                    <StagesDisplay stages={taskStages} closeStage={deleteStageHandle}/>
                    <div className="addStageButton" onClick={onAddStage}>
                        <i className="fa fa-plus" aria-hidden="true"></i> Add Stage
                    </div>
                </div>

                <TaskStatus status={taskFields.status as Status} handleStatusChange={onAction.bind(null,'status')} />
                <TaskDate date={taskFields.dueDate} handleDateChange={onAction.bind(null,'dueDate')} />
                <div className="overlayButtons">
                <div className="saveButton" onClick={onSave}>
                    <i className="fa fa-check" aria-hidden="true"></i> SAVE
                </div>
                <div className="deleteButton" onClick={onDelete}>
                    <i className="fa fa-times" aria-hidden="true"></i> DELETE CARD
                </div>
                </div>
            </div>,
            elem.current
    );
}