import React from "react";
import {User} from "../../types";

const AddUserButton = React.memo(function({clickHandle} : {clickHandle : (user:User) => void}) : React.ReactElement {
    function clickHandler() : void {
        const newUser : User = new User();
        newUser.imageUrl = "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png";
        clickHandle(newUser);
    }

    return( 
        <div className="addUserContainer" onClick={clickHandler}>
            <div className="addUser">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
            </div>
        </div>
    );
});

export default AddUserButton;