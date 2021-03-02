import {Task} from "../../types";
import {Stage} from "../../types";

const statusColorMapping = ["yellow" , "purple" , "red" , "chartreuse"];
const monthMapping = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov", "Dec"];
const statusMapping = ["Not started" , "In-progress" , "On hold" , "Completed"];

function getDateString(date : string) : string {
    let dateString = " ";
    dateString+=date.slice(8,10);
    dateString+=" ";
    dateString+=monthMapping[+date.slice(5,7)-1];
    dateString+=",";
    dateString+=date.slice(0,4);
    return dateString;
}

function getStageString(stages: Stage) : string {
    let totalStages = 0;
    let completedStages = 0;
    for(let prop in stages)
    {
        totalStages++;
        if(stages[prop])
        {
            completedStages++;
        }
    }
    const stagesString = " " + completedStages + "/" + totalStages;
    return stagesString;
}

export default function TaskInfo({task} : {task : Task}) : React.ReactElement {
    return(
        <div className="taskInfo">
            <span className="taskStatus">
                <i className="fa fa-square taskStatusSymbol" aria-hidden="true" style={{color : statusColorMapping[task.status]}}></i> {statusMapping[task.status]}
            </span>
            <span className="taskDue">
                <i className="fa fa-clock-o" aria-hidden="true"></i> {getDateString(task.dueDate)}
            </span>
            <span>
                <i className="fa fa-check-square-o" aria-hidden="true"></i> {getStageString(task.stages)}
            </span>
        </div>
    );
}