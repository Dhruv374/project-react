import {Stage} from "../../types";
import React, { useCallback } from "react";

const stagesDisplay =  React.memo(function ({stages,closeStage} : {stages : Stage , closeStage : (stageName : string) => void}) : React.ReactElement {
    const stageArray = Object.keys(stages);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {

        e.target.value === "on" ? stages[e.target.dataset.stagename as string] = true :
                                  stages[e.target.dataset.stagename as string] = false;
                                  
    },[]);

    const onCloseStage = useCallback(function (e : React.MouseEvent<HTMLElement>) : void {
        const target  = e.target as HTMLElement;
        if(typeof target.dataset.stagename == "string") {
            closeStage(target.dataset.stagename);
        }
    },[]);

    return (
        <ul className="stagesList"> 
            {stageArray.map(function(stage,index){
                return (<li key={index}><input type="checkbox" defaultChecked={stages[stage]} onChange={handleChange} data-stagename={stage}/>{` ${stage}`}
                <span className="stageCloseButton" onClick={onCloseStage} data-stagename={stage}>{" \u274c"}</span> 
                </li>);
            }   )}
        </ul>
    );
});

export default stagesDisplay;