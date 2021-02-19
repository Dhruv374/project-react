import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { NavLink,Link } from 'react-router-dom';
import {PropTypes} from 'prop-types';

function Navbar() {

    let [task,setTask] = useState(true);

    return (
        <div className="topnav">
            <Link to={'/tasks'} onClick={() => setTask(true)} className={task ? "active" : ""}>TASKS</Link>
            <Link to={'/team'} onClick={() => setTask(false)} className={task ? "" : "active"}>TEAM</Link>
        </div>
    );
}

function Navigation() {
    return (
        <header className="header">
            <Navbar />
            <div id="projectName">
                <h1>McDonalds Website Project</h1>
            </div>
        </header>
    );
}

export default Navigation;