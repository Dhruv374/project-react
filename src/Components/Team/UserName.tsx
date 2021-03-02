import {useCallback, useState} from "react";

export default function UserName({name,handleNameChange} : {name : string, handleNameChange : (name : string) => void}) : React.ReactElement {
    const [userName,setUserName] = useState<string>(name);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        setUserName(e.target.value);
        handleNameChange(e.target.value);
    },[]);

    return (
        <div className="userNameOverlay">
            <label htmlFor="userNameInput"><i className="fa fa-id-card-o" aria-hidden="true"></i> Full Name :- 
            </label>
            <input value={userName} onChange={handleChange} type="text" id="userNameInput" name="userNameInput" />  
        </div>
    )
}