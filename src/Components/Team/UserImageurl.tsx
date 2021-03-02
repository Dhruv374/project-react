import {useCallback, useState} from "react";
import {UserImageurlProps} from "../../types";

export default function UserImageurl({imageUrl,handleImageChange,userName} : UserImageurlProps) : React.ReactElement {

    const [userImageurl,setUserImageurl] = useState<string>(imageUrl);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLInputElement>) : void {
        let uploadUrl = e.target.value;
        uploadUrl = uploadUrl.slice(12);
        uploadUrl = 'assets/' + uploadUrl;
        setUserImageurl(uploadUrl);
        handleImageChange(uploadUrl);
    },[]);

    return (
        <div className="userImageOverlay">
            <label htmlFor="image-input">
                <img src ={userImageurl} alt={userName}/>
            </label>
            <input onChange={handleChange} type="file" id="image-input" accept="image/*" style={{display:'none'}} />
        </div> 
    )
}