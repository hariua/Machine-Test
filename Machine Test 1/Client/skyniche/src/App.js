import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Appointment from './Components/Appointment/Appointment'
export default function App() {
  return (
    <div>
      <Router>
        <Route path="/appointment"><Appointment /></Route>
      </Router>
    </div>
  )
}

