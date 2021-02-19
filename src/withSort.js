import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react"

const withSort = function(Component,property) {
    return function(props) {
        
        let myProp = {};
        function customSort(objA,objB) {
            if(objA[property] < objB[property]) {
                return -1;
            } 
            else if(objA[property] > objB[property]) {
                return 1;
            }
            return 0;
        }

        for(let prop in props) {
            if(Array.isArray(props[prop])) {
                myProp[prop] = [...props[prop]];
                if(props['type'] == 1){
                    myProp[prop].sort(customSort);
                }
                else if(props['type'] == 2) {
                    myProp[prop].sort(customSort);
                    myProp[prop].reverse();
                }
            }
        }

        return <Component {...Object.assign({},props,myProp)}/>
    }
}

export default withSort;