import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux';
import {Provider} from "react-redux";
import App from './App.tsx'
import './index.css'
import audioReducer from './redux/audioReducer.tsx';
const store = createStore(audioReducer);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)
