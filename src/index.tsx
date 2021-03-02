import React,{lazy} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';
import 'font-awesome/css/font-awesome.min.css';

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.querySelector(".base")
);
