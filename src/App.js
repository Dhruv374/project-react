import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Tasks from './Tasks';
import Team from './Team';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers.js'
import { useEffect } from 'react';

const state = {
  users: JSON.parse(localStorage.getItem('users')),
  tasks: JSON.parse(localStorage.getItem('tasks')),
  cities: {},
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
              const data = await response.json();
              state['cities'] = data["results"];
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


store.subscribe(() => console.log("Hello"));
store.subscribe(() => {
  let state = store.getState();
  let users = state.users;
  let tasks = state.tasks;
  localStorage.setItem('users',JSON.stringify(users));
  localStorage.setItem('tasks',JSON.stringify(tasks));
})

export default App;
