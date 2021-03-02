import React  from "react";
import {User} from "../../types";
import UserImage from "./UserImage";

const UserCard = React.memo(function({user,editClick} : {user: User , editClick: (user : User) => void}) : React.ReactElement {

    //console.log("Called again");

    function onEdit() : void {
        editClick(user);
    }
    
    return (
        <section className="flexItems">
            <div className="userEdit" onClick={onEdit}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <UserImage source={user.imageUrl} userName={user.name}/>

            <div className="userName">
                {user.name}
            </div>

            <div className="userDesignation">
                {user.designation}
            </div>
            <hr color='#404040' className="lineBreaks" />

            <div className="userInfo userLocation">
                <i className="fa fa-map-marker"></i> {`  ${user.location}`}
            </div>

            <div className="userInfo userMail">
                <i className="fa fa-envelope" aria-hidden="true"></i> {`  ${user.email}`}
            </div>

            <div className="userInfo userPhone">
                <i className="fa fa-phone" aria-hidden="true"></i> {` ${user.phone}`}
            </div>
        </section>
    );
});

export default UserCard;