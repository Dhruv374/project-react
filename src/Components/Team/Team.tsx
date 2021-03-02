import React, {useState} from "react";
import {useSelector} from "react-redux";
import {State} from "../../types";
import withSort from "../WithSortHoc";
import UserContainer from "./UserContainer";

const UserContainerSort = withSort((UserContainer as unknown) as typeof React.Component,'name');
export default function Team() : React.ReactElement {
    
    const [sort,setSort] = useState("ASC");
    const users = useSelector((state:State) => state.users);
    function sortChange() : void {
        if(sort == "ASC") {
            setSort("DESC");
        }
        else {
            setSort("ASC");
        }
    }

    const elem = <div className="addUserContainer sortButton" onClick={sortChange}>
                    <div className="addUser">
                        <i className={"fa " + ((sort == "ASC") ? "fa-sort-alpha-desc":"fa-sort-alpha-asc")} aria-hidden="true"></i>
                    </div>
                 </div>;
    
    return (
        <section className="board">
            <UserContainerSort users={users} type={sort}/>
            {elem}
        </section>
    );
}