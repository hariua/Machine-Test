import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './Components/Home/Home'
export default function App() {
  return (
    <div>
      <Router>
        <Route path ="/" exact><Home /></Route>
      </Router>
    </div>
  )
}
