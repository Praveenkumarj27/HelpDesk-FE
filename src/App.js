import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ZenForm from './components/ZenForm';
import Success from './components/Success';
import Status from './components/Status';
import Dashboard from './components/Dashboard';
import Issues from './components/Issues';
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Query from './components/Query';


function App() {
  return <>
    <BrowserRouter>
        <Routes>
          <Route path='/new-issue' element={<ZenForm/>}/>
          <Route path='/success/:id' element={<Success/>}/>
          <Route path='/track-issue' element={<Status/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/issue/:id' element={<Issues/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/navbar' element={<Navbar/>}/>
          <Route path='/sidebar' element={<Sidebar/>}/>
          <Route path='/query' element={<Query/>}/>
          {/* <Route path='*' element={<Navigate to='/new-issue'/>}/> */}
        </Routes>
     
    </BrowserRouter>
  </>
}

export default App;
