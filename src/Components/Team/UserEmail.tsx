import {useCallback, useState} from "react";

export default function UserEmail({email,handleEmailChange} : {email : string, handleEmailChange : (email : string) => void}) : React.ReactElement {

    const [userEmail,setUserEmail] = useState<string>(email);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        setUserEmail(e.target.value);
        handleEmailChange(e.target.value);
    },[]);

    return (
        <div className="userEmailOverlay">
            <label htmlFor="userEmailInput"><i className="fa fa-envelope" aria-hidden="true"></i> Email :- </label>
            <input value={userEmail} onChange={handleChange} type="text" id="userEmailInput" name="userEmailInput" />  
        </div>
    )
}