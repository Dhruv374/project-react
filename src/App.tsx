import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Tasks from './Tasks';
import Team from './Team';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers'
import { useEffect } from 'react';
import {userObject} from './Team';
import {taskObject} from './Tasks';

interface cityType {
  "objectId": string,
  "name": string,
  "createdAt": string,
  "updatedAt": string,
}

interface stateType {
  users : userObject[],
  tasks : taskObject[],
  cities : string[],
}

const state: stateType = {
  users: JSON.parse(localStorage.getItem('users') as string),
  tasks: JSON.parse(localStorage.getItem('tasks') as string),
  cities: [],
}

const store = createStore(rootReducer,state);

function App() {

    useEffect(function() {
      (async () => {
          const where = encodeURIComponent(JSON.stringify({
            "population": {
              "$gt": 10000000
            },
            "country": {
              "$exists": true
            }
          }));
          try {
          const response = await fetch(
            `https://parseapi.back4app.com/classes/Continentscountriescities_City?order=name&keys=name&where=${where}`,
            {
              headers: {
                'X-Parse-Application-Id': 'I53YbsXTMysWrk8TXLtQZ05ho5IgEj5kBtCheczE', 
                'X-Parse-REST-API-Key': 'PqE3FK7LKNTmGBXfKF5w8Tx9lmAMQNxDl61Mba94',
              }
            }
          );
              const data: {"results" : cityType[]} = await response.json();
              const cityObjectsArray: cityType[] = data["results"];
              state['cities'] = cityObjectsArray.map(function(city: cityType): string {
                return city["name"];
              });
          }
          catch(err) {
              state['cities'] = ["Mumbai" , "Delhi" , "Banglore" , "Chennai" , "Hyderabad" , "Ahmedabad"];
          }
        })();
    },[])
  
  return (
    <Provider store={store} >
      <BrowserRouter>
          <div>
            <Navigation />
              <Switch>
              <Route path="/tasks" component={Tasks} exact/>
              <Route path="/team" component={Team}/>
            </Switch>
          </div> 
        </BrowserRouter>
    </Provider>
  );
}

store.subscribe(() => {
  let state = store.getState();
  let users = state.users;
  let tasks = state.tasks;
  localStorage.setItem('users',JSON.stringify(users));
  localStorage.setItem('tasks',JSON.stringify(tasks));
})

export default App;
