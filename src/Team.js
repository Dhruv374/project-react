import { faCode } from '@fortawesome/free-solid-svg-icons';
import react from 'react';
import React,{useEffect, useState, useCallback} from 'react';
import { useMemo,useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import actions from './store/actions';
import {PropTypes} from 'prop-types';
import withSort from './withSort';


const UserContainerSort = withSort(UserContainer,'name');

const AddUserButton = React.memo(function({clickHandle}) {
    function clickCallback() {
        clickHandle({imageUrl : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"});
    }

    return( 
        <div className="addUserContainer" onClick={clickCallback}>
            <div className="addUser">
                <i className="fa fa-user-plus" aria-hidden="true"></i>
            </div>
        </div>
    );
});
AddUserButton.propTypes = {
    clickHandle: PropTypes.func,
}

const UserImage = React.memo(function({src,userName}) {
    return (
        <div className="userImage">
            <img src = {src} alt={userName} height="100px" width="100px" />
        </div>
    );
})
UserImage.propTypes = {
    src: PropTypes.string,
    userName: PropTypes.string,
}

const UserCard = React.memo(function({user,editClick}) {

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
UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        designation: PropTypes.string,
        location: PropTypes.string,
        phone: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.number),
        email: function(props,propName) {
            if(typeof props[propName] != "string" || !props[propName].includes('@'))
            {
                return new Error("Invalid Email address");
            }
        }
    }),
    editClick: PropTypes.func,
};

function UserImageurl({imageUrl,handleImageChange,userName}) {

    const [userImageurl,setUserImageurl] = useState(imageUrl);

    function handleChange(e) {
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
UserImageurl.propTypes = {
    imageUrl: PropTypes.string,
    handleImageChange: PropTypes.func,
}


function UserName({name,handleNameChange}) {
    const [userName,setUserName] = useState(name);

    function handleChange(e) {
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
UserName.propTypes = {
    name: PropTypes.string,
    handleNameChange: PropTypes.func,
}

function UserDesignation({designation,handleDesignationChange}) {
    const [userDesignation,setUserDesignation] = useState(designation);

    function handleChange(e) {
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
UserDesignation.propTypes = {
    designation: PropTypes.string,
    handleDesignationChange: PropTypes.func,
}

function UserLocation({location,handleLocationChange}) {

    const cities = useSelector((state) => state.cities);
    const [userLocation,setUserLocation] = useState(location);

    function handleChange(e) {
        setUserLocation(e.target.value);
        handleLocationChange(e.target.value);
    }

    return (

        <div className="userLocationOverlay">
            <label htmlFor="userLocationInput"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Location :- </label>
            <select id="userLocationInput" value={userLocation} onChange={handleChange}>
                {cities.map(function(city) {
                    return (<option value={city["name"]} key={city["objectId"]}>{city["name"]}</option>);
                })}
            </select>  
        </div>
    )
}
UserLocation.propTypes = {
    location: PropTypes.string,
    handleLocationChange: PropTypes.func,
}

function UserEmail({email,handleEmailChange}) {

    const [userEmail,setUserEmail] = useState(email);

    function handleChange(e) {
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
UserEmail.propTypes = {
    email: function(props,propName) {
        if(typeof props[propName] != "string" || !props[propName].includes('@'))
        {
            return new Error("Invalid Email address");
        }
    },
    handleEmailChange: PropTypes.func,
}

function UserPhone({phone,handlePhoneChange}) {

    const [userPhone,setUserPhone] = useState(phone);

    function handleChange(e) {
        setUserPhone(e.target.value);
        handlePhoneChange(e.target.value);
    }

    return (
        <div className="userPhoneOverlay">
            <label htmlFor="userPhoneInput"><i className="fa fa-phone" aria-hidden="true"></i> Phone :- </label>
            <input value={+userPhone} onChange={handleChange} type="number" id="userPhoneInput" name="userPhoneInput" placeholder="(digits only)" />  
        </div>
    )
}
UserPhone.propTypes = {
    phone: PropTypes.string,
    handlePhoneChange: PropTypes.func,
}


function UserOverlay({user,handleClose,handleSave,handleDelete}) {

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
    
    function handleImageChange(imageUrl) {
        userImageurl = imageUrl;
    }

    function handleNameChange(name) {
        userName = name;
    }

    function handleDesignationChange(designation) {
        userDesignation = designation;
    }

    function handleLocationChange(location) {
        userLocation = location;
    }

    function handleEmailChange(email) {
        userEmail = email;
    }

    function handlePhoneChange(phone) {
        userPhone = phone;
    }

    function saveCallBack() {
        let newUser = {};
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
        newUser.phone = userPhone;
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
UserOverlay.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        designation: PropTypes.string,
        location: PropTypes.string,
        phone: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.number),
        email: function(props,propName) {
            if(typeof props[propName] != "string" || !props[propName].includes('@'))
            {
                return new Error("Invalid Email address");
            }
        }
    }),
    handleClose: PropTypes.func,
    handleDelete: PropTypes.func,
    handleSave: PropTypes.func,
};

function UserContainer({users}) 
{
    const dispatch = useDispatch();

    const [overlay,setOverlay] = useState(null);

    const editClick = useCallback((user) => setOverlay(user),[]);

    function handleClose() {
        //for animation
        let elem = document.querySelector('.userOverlay');
        elem.classList.add('closeOverlay');
        setTimeout(() => setOverlay(null),500);
    }

    function handleSave(newUser) {
        if(newUser.id == -1) {
            newUser.id = users[users.length-1].id+1;
            newUser.tasks = [];
            dispatch(actions.addUser(newUser));
        }
        else {
            dispatch(actions.updateUser(newUser.id,newUser))
        }
        //for animation
        let elem = document.querySelector('.userOverlay');
        elem.classList.add('closeOverlay');
        setTimeout(() => setOverlay(null),500);
    }

    function handleDelete(id) {
        dispatch(actions.removeUser(id));
        setOverlay(null);
    }

    const modal = (overlay==null) ? null : <UserOverlay user={overlay} handleClose={handleClose} handleSave={handleSave} handleDelete={handleDelete}/>;
    return (
        <>
            <div id="flexContainer">
                {users.map((user) => <UserCard user={user} editClick={editClick} key={user.id}/>)}
            </div>
            <AddUserButton clickHandle={editClick}/>
            {modal}
        </>
    )
}

function Team(props) {
    
    const [sort,setSort] = useState(1);
    const users = useSelector(state => state.users);
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