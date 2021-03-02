import {useCallback, useState} from "react";

export default function TaskImageurl({image,handleImageChange} : {image : string , handleImageChange : (url : string) => void}) : React.ReactElement {

    const [taskImage,setTaskImage] = useState(image);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        let uploadUrl = e.target.value;
        uploadUrl = uploadUrl.slice(12);
        uploadUrl = 'assets/' + uploadUrl;
        setTaskImage(uploadUrl);
        handleImageChange(uploadUrl);
    },[]);

    return (
        <div className="taskImageOverlay">
            <label htmlFor="task-image-input">
                <img src = {taskImage} alt={taskImage}/>
            </label>
            <input onChange={handleChange} type="file" id="task-image-input" accept="image/*" style={{display:'none'}} />
        </div> 
    )
}