import {useSelector} from "react-redux";
import {useCallback, useState} from "react";
import {State} from "../../types";

export default function UserLocation({location,handleLocationChange} : {location : string, handleLocationChange : (location : string) => void}) : React.ReactElement {

    const cities = useSelector((state: State) => state.cities);
    const [userLocation,setUserLocation] = useState<string>(location);

    const handleChange = useCallback(function (e : React.ChangeEvent<HTMLSelectElement>) : void {
        setUserLocation(e.target.value);
        handleLocationChange(e.target.value);
    },[]);

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