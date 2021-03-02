import {useCallback, useState} from "react";

export default function UserPhone({phone,handlePhoneChange} : {phone : number, handlePhoneChange : (phone: string) => void}) : React.ReactElement {

    const [userPhone,setUserPhone] = useState<number>(phone);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        setUserPhone(+e.target.value);
        handlePhoneChange(e.target.value);
    },[]);

    return (
        <div className="userPhoneOverlay">
            <label htmlFor="userPhoneInput"><i className="fa fa-phone" aria-hidden="true"></i> Phone :- </label>
            <input value={+userPhone} onChange={handleChange} type="number" id="userPhoneInput" name="userPhoneInput" placeholder="(digits only)" />  
        </div>
    )
}