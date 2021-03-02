import {useCallback, useState} from "react";

export default function UserDesignation({designation,handleDesignationChange} : {designation : string, handleDesignationChange : (designation : string) => void}) : React.ReactElement {
    const [userDesignation,setUserDesignation] = useState<string>(designation);

    const  handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        setUserDesignation(e.target.value);
        handleDesignationChange(e.target.value);
    },[]);

    return (
        <div className="userDesignationOverlay">
            <label htmlFor="userDesignationInput"><i className="fa fa-id-badge" aria-hidden="true"></i> Designation :- </label>
            <input value={userDesignation} onChange={handleChange} type="text" id="userDesignationInput" name="userDesignationInput" />  
        </div>
    )
}