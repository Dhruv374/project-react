import {UserContainerProps , User} from "../../types";
import {useDispatch} from "react-redux";
import {useState , useCallback} from "react";
import actions from "../../store/actions";
import UserOverlay from "./UserOverlay";
import UserCard from "./UserCard";
import AddUserButton from "./AddUserButton";

export default function UserContainer({users}: UserContainerProps) : React.ReactElement 
{
    const dispatch = useDispatch();

    const [overlay,setOverlay] = useState<User | null>(null);

    const editClick = useCallback((user: User) : void => setOverlay(user),[]);

    function handleClose() : void {
        //for animation
        const elem: HTMLElement | null = document.querySelector('.userOverlay');
        if(elem)
        {
            elem.classList.add('closeOverlay');
        }
        setTimeout(() => setOverlay(null),500);
    }

    function handleSave(newUser: User) : void {
        if(newUser.id == -1) {
            newUser.id = users[users.length-1].id+1;
            newUser.tasks = [];
            dispatch(actions.addUser(newUser));
        }
        else {
            dispatch(actions.updateUser(newUser.id,newUser))
        }
        //for animation
        const elem: HTMLElement | null = document.querySelector('.userOverlay');
        if(elem) {
            elem.classList.add('closeOverlay');
        }
        setTimeout(() => setOverlay(null),500);
    }

    function handleDelete(id : number) : void {
        dispatch(actions.removeUser(id));
        setOverlay(null);
    }

    const modal = (overlay==null) ? null : <UserOverlay user={overlay} handleClose={handleClose} handleSave={handleSave} handleDelete={handleDelete}/>;
    return (
        <>
            <div id="flexContainer">
                {
                    users.map(function(user : User) {
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