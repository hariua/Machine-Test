import React from 'react'
import {BrowserRouter as Router,Route, useHistory} from 'react-router-dom'
import DualDBCrud from './Components/Dual Database/DualDBCrud'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import NewNote from './Components/New Note/NewNote'
export default function App() {
  return (
    <div>
      <Router>
        {/* <Route path ="/" exact><Login /></Route>
        <Route path = '/home'><Home /></Route>
        <Route path="/addNewNote"><NewNote /></Route> */}
        <Route path="/" exact ><DualDBCrud /></Route>
      </Router>
    </div>
  )
}
