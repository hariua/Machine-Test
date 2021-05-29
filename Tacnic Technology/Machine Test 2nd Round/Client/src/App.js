import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import LandingPage from './Components/Landing Page/LandingPage'
import TodoList from './Components/TodoList/TodoList'
export default function App() {
  return (
    <div>
      <Router>
        <Route path ="/" exact><LandingPage /></Route>
        <Route path = "/todo"><TodoList /></Route>
      </Router>
    </div>
  )
}
