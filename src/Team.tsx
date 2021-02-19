import { faCode } from '@fortawesome/free-solid-svg-icons';
import react from 'react';
import React,{useEffect, useState, useCallback} from 'react';
import { useMemo,useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from './store/actions';
import withSort from './withSort';
import { number } from 'prop-types';
import { Interface } from 'readline';
import { StringifyOptions } from 'querystring';
import {taskObject} from './Tasks';

//type definitions start here
export interface userObject {
    id : number,
    imageUrl : string,
    name : string,
    designation : string,
    location : string,
    email : string,
    phone : number,
    tasks : number[],
}

export class userObject implements userObject {}

type usersArray = userObject[];
interface UserContainerProps {
    users: usersArray,
}

interface UserOverlayProps {
    user: userObject,
    handleClose() : void,
    handleSave(user : userObject) : void,
    handleDelete(id : number) : void,
}

interface userImageurlProps {
    imageUrl : string,
    handleImageChange(url : string) : void,
    userName : string,
}

interface stateType {
    users : userObject[],
    tasks : taskObject[],
    cities : string[],
}

//type definitions end here

const UserContainerSort = withSort((UserContainer as unknown) as typeof React.Component,'name');

const AddUserButton = React.memo(function({clickHandle} : {clickHandle : (user:userObject) => void}) {
    function clickCallback() {
        let newUser : userObject = new userObject();
        newUser.imageUrl = "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png";
        clickHandle(newUser);
    }

    return( 
        <div className="addUserContainer" onClick={clickCallback}>
            <div className="addUser">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
            </div>
        </div>
    );
});

const UserImage = React.memo(function({src ,userName} : {src: string , userName: string}) {
    return (
        <div className="userImage">
            <img src = {src} alt={userName} height="100px" width="100px" />
        </div>
    );
})

const UserCard = React.memo(function({user,editClick} : {user: userObject , editClick: (user : userObject) => void}) {

    //console.log("Called again");

    function hadnleClickCallback() {
        editClick(user);
    }
    
    return (
        <section className="flexItems">
            <div className="userEdit" onClick={hadnleClickCallback}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <UserImage src={user.imageUrl} userName={user.name}/>

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

function UserImageurl({imageUrl,handleImageChange,userName} : userImageurlProps) {

    const [userImageurl,setUserImageurl] = useState<string>(imageUrl);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        let uploadUrl = e.target.value;
        uploadUrl = uploadUrl.slice(12);
        uploadUrl = 'assets/' + uploadUrl;
        setUserImageurl(uploadUrl);
        handleImageChange(uploadUrl);
    }

    return (
        <div className="userImageOverlay">
            <label htmlFor="image-input">
                <img src ={userImageurl} alt={userName} height="150px" width="150px" />
            </label>
            <input onChange={handleChange} type="file" id="image-input" accept="image/*" style={{display:'none'}} />
        </div> 
    )
}

function UserName({name,handleNameChange} : {name : string, handleNameChange : (name : string) => void}) {
    const [userName,setUserName] = useState<string>(name);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value);
        handleNameChange(e.target.value);
    }

    return (
        <div className="userNameOverlay">
            <label htmlFor="userNameInput"><i className="fa fa-id-card-o" aria-hidden="true"></i> Full Name :- 
            </label>
            <input value={userName} onChange={handleChange} type="text" id="userNameInput" name="userNameInput" />  
        </div>
    )
}

function UserDesignation({designation,handleDesignationChange} : {designation : string, handleDesignationChange : (designation : string) => void}) {
    const [userDesignation,setUserDesignation] = useState<string>(designation);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUserDesignation(e.target.value);
        handleDesignationChange(e.target.value);
    }

    return (
        <div className="userDesignationOverlay">
            <label htmlFor="userDesignationInput"><i className="fa fa-id-badge" aria-hidden="true"></i> Designation :- </label>
            <input value={userDesignation} onChange={handleChange} type="text" id="userDesignationInput" name="userDesignationInput" />  
        </div>
    )
}

function UserLocation({location,handleLocationChange} : {location : string, handleLocationChange : (location : string) => void}) {

    const cities = useSelector((state: stateType) => state.cities);
    const [userLocation,setUserLocation] = useState<string>(location);

    function handleChange(e : React.ChangeEvent<HTMLSelectElement>) {
        setUserLocation(e.target.value);
        handleLocationChange(e.target.value);
    }

    return (

        <div className="userLocationOverlay">
            <label htmlFor="userLocationInput"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Location :- </label>
            <select id="userLocationInput" value={userLocation} onChange={handleChange}>
                {cities.map(function(city : string) {
                    return (<option value={city} key={city}>{city}</option>);
                })}
            </select>  
        </div>
    )
}

function UserEmail({email,handleEmailChange} : {email : string, handleEmailChange : (email : string) => void}) {

    const [userEmail,setUserEmail] = useState<string>(email);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUserEmail(e.target.value);
        handleEmailChange(e.target.value);
    }

    return (
        <div className="userEmailOverlay">
            <label htmlFor="userEmailInput"><i className="fa fa-envelope" aria-hidden="true"></i> Email :- </label>
            <input value={userEmail} onChange={handleChange} type="text" id="userEmailInput" name="userEmailInput" />  
        </div>
    )
}

function UserPhone({phone,handlePhoneChange} : {phone : number, handlePhoneChange : (phone: number) => void}) {

    const [userPhone,setUserPhone] = useState<number>(phone);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUserPhone(+e.target.value);
        handlePhoneChange(+e.target.value);
    }

    return (
        <div className="userPhoneOverlay">
            <label htmlFor="userPhoneInput"><i className="fa fa-phone" aria-hidden="true"></i> Phone :- </label>
            <input value={+userPhone} onChange={handleChange} type="number" id="userPhoneInput" name="userPhoneInput" placeholder="(digits only)" />  
        </div>
    )
}

function UserOverlay({user,handleClose,handleSave,handleDelete} : UserOverlayProps) {

    const elem = useRef(document.createElement('div'));
    useEffect(function() {
        elem.current.classList.add('userOverlayContainer');
        document.body.appendChild(elem.current);

        return function() {
            document.body.removeChild(elem.current);
        }
    },[]);

    let userImageurl=user.imageUrl || "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
    let userName = user.name || "";
    let userDesignation = user.designation || "";
    let userLocation = user.location || "";
    let userEmail = user.email || "";
    let userPhone = user.phone || "";
    
    function handleImageChange(imageUrl: string) {
        userImageurl = imageUrl;
    }

    function handleNameChange(name: string) {
        userName = name;
    }

    function handleDesignationChange(designation: string) {
        userDesignation = designation;
    }

    function handleLocationChange(location: string) {
        userLocation = location;
    }

    function handleEmailChange(email: string) {
        userEmail = email;
    }

    function handlePhoneChange(phone: number) {
        userPhone = phone;
    }

    function saveCallBack() {
        let newUser:userObject = new userObject();
        if(isNaN(user.id)) {
            newUser.id = -1;
        }
        else {
            newUser.id = user.id;
            newUser.tasks = [...user.tasks];
        }
        newUser.imageUrl = userImageurl;
        newUser.name = userName;
        newUser.designation = userDesignation;
        newUser.location = userLocation;
        newUser.email = userEmail;
        newUser.phone = +userPhone;
        handleSave(newUser);
    }

    function deleteCallBack() {
        if(isNaN(user.id)) {
            closeCallback();
        }
        else {
            handleDelete(user.id);
        }
    }
    
    function closeCallback () {
        handleClose();
    }

    return ReactDOM.createPortal(
            <div className="userOverlay">
                <div className="closeButton" onClick={closeCallback}>
                X
                </div>
                <UserImageurl imageUrl={userImageurl} userName={user.name} handleImageChange={handleImageChange} />
                <UserName name={userName} handleNameChange={handleNameChange} />
                <UserDesignation designation={userDesignation} handleDesignationChange={handleDesignationChange} />
                <UserLocation location={userLocation} handleLocationChange={handleLocationChange} />
                <UserEmail email={userEmail} handleEmailChange={handleEmailChange} />
                <UserPhone phone={user.phone} handlePhoneChange={handlePhoneChange} />

                <div className="overlayButtons">
                    <div className="saveButton" onClick={saveCallBack}>
                        <i className="fa fa-check" aria-hidden="true"></i> SAVE
                    </div>
                    <div className="deleteButton" onClick={deleteCallBack}>
                        <i className="fa fa-times" aria-hidden="true"></i> DELETE USER
                    </div>
                </div>
            </div>,
            elem.current
    );
}

function UserContainer({users}: UserContainerProps) 
{
    const dispatch = useDispatch();

    const [overlay,setOverlay] = useState<userObject | null>(null);

    const editClick = useCallback((user: userObject) => setOverlay(user),[]);

    function handleClose() {
        //for animation
        let elem: HTMLElement | null = document.querySelector('.userOverlay');
        if(elem)
        {
            elem.classList.add('closeOverlay');
        }
        setTimeout(() => setOverlay(null),500);
    }

    function handleSave(newUser: userObject) {
        if(newUser.id == -1) {
            newUser.id = users[users.length-1].id+1;
            newUser.tasks = [];
            dispatch(actions.addUser(newUser));
        }
        else {
            dispatch(actions.updateUser(newUser.id,newUser))
        }
        //for animation
        let elem: HTMLElement | null = document.querySelector('.userOverlay');
        if(elem) {
            elem.classList.add('closeOverlay');
        }
        setTimeout(() => setOverlay(null),500);
    }

    function handleDelete(id : number) {
        dispatch(actions.removeUser(id));
        setOverlay(null);
    }

    const modal = (overlay==null) ? null : <UserOverlay user={overlay} handleClose={handleClose} handleSave={handleSave} handleDelete={handleDelete}/>;
    return (
        <>
            <div id="flexContainer">
                {
                    users.map(function(user : userObject) {
                        const props = {user,editClick,key:user.id};
                        return <UserCard {...props} />
                    })
                }
            </div>
            <AddUserButton clickHandle={editClick}/>
            {modal}
        </>
    )
}

function Team() {
    
    const [sort,setSort] = useState(1);
    const users = useSelector((state:stateType) => state.users);
    function sortChange() {
        if(sort == 1) {
            setSort(2);
        }
        else {
            setSort(1);
        }
    }

    const elem = <div className="addUserContainer sortButton" onClick={sortChange}>
                    <div className="addUser">
                        <i className={"fa " + ((sort == 1) ? "fa-sort-alpha-desc":"fa-sort-alpha-asc")} aria-hidden="true"></i>
                    </div>
                 </div>;
    
    return (
        <section className="board">
            <UserContainerSort users={users} type={sort}/>
            {elem}
        </section>
    );
}

export default Team;