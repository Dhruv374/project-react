import React from "react";

const TaskImage = React.memo(function({source} : {source : string}) : React.ReactElement {
    return (
        <div className="taskImage">
            <img src = {source} alt={source}/>
        </div>
    );
})

export default TaskImage;