import React from "react";

const UserImage = React.memo(function({source ,userName} : {source: string , userName: string}) : React.ReactElement {
    return (
        <div className="userImage">
            <img src = {source} alt={userName} />
        </div>
    );
})

export default UserImage;