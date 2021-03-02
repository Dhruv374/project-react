import {UserOverlayProps , User , UserFields} from "../../types";
import {useRef , useEffect} from "react";
import ReactDOM from "react-dom";
import UserDesignation from "./UserDesignation";
import UserEmail from "./UserEmail";
import UserImageurl from "./UserImageurl";
import UserName from "./UserName";
import UserLocation from "./UserLocation";
import UserPhone from "./UserPhone";

export default function UserOverlay({user,handleClose,handleSave,handleDelete} : UserOverlayProps) : React.ReactElement {

    const elem = useRef(document.createElement('div'));
    useEffect(function() {
        elem.current.classList.add('userOverlayContainer');
        document.body.appendChild(elem.current);

        return function() {
            document.body.removeChild(elem.current);
        }
    },[]);

    const userFields : UserFields = {
        imageUrl : user.imageUrl || "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
        name : user.name || "",
        designation : user.designation || "",
        location : user.location || "",
        email : user.email || "",
        phone : String(user.phone) || "",
    };

    function onAction(prop : 'imageUrl' | 'name' | 'designation' | 'location' | 'email' | 'phone',value : string): void {
        userFields[prop] = value;
    }

    function onSave() : void {
        const newUser:User = new User();
        if(isNaN(user.id)) {
            newUser.id = -1;
        }
        else {
            newUser.id = user.id;
            newUser.tasks = [...user.tasks];
        }
        newUser.imageUrl = userFields.imageUrl as string;
        newUser.name = userFields.name as string;
        newUser.designation = userFields.designation as string;
        newUser.location = userFields.location as string;
        newUser.email = userFields.email as string;
        newUser.phone = +userFields.phone as number;
        handleSave(newUser);
    }

    function onDelete() : void {
        if(isNaN(user.id)) {
            handleClose();
        }
        else {
            handleDelete(user.id);
        }
    }

    return ReactDOM.createPortal(
            <div className="userOverlay">
                <div className="closeButton" onClick={handleClose}>
                X
                </div>
                <UserImageurl imageUrl={userFields.imageUrl} userName={user.name} handleImageChange={onAction.bind(null,'imageUrl')} />
                <UserName name={userFields.name} handleNameChange={onAction.bind(null,'name')} />
                <UserDesignation designation={userFields.designation} handleDesignationChange={onAction.bind(null,'designation')} />
                <UserLocation location={userFields.location} handleLocationChange={onAction.bind(null,'location')} />
                <UserEmail email={userFields.email} handleEmailChange={onAction.bind(null,'email')} />
                <UserPhone phone={+userFields.phone} handlePhoneChange={onAction.bind(null,'phone')} />

                <div className="overlayButtons">
                    <div className="saveButton" onClick={onSave}>
                        <i className="fa fa-check" aria-hidden="true"></i> SAVE
                    </div>
                    <div className="deleteButton" onClick={onDelete}>
                        <i className="fa fa-times" aria-hidden="true"></i> DELETE USER
                    </div>
                </div>
            </div>,
            elem.current
    );
}