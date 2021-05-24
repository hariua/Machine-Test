import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import AllScreenTime from './Components/All Screen Time/AllScreenTime'
import ClassTime from './Components/Class Time/ClassTime'
import Filter from './Components/Filter/Filter'
import FreeTime from './Components/Free Time/FreeTime'
import Header from './Components/Header/Header'
import StudyTime from './Components/Study Time/StudyTime'
import LandingPage from './LandingPage'

export default function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact><LandingPage/> </Route>
        <Route path="/summaryFilter=All"><Header /><Filter val={'All'} /><AllScreenTime /></Route>
        <Route path="/summaryFilter=Class"><Header /><Filter val={'Class'} /><ClassTime /></Route>
        <Route path="/summaryFilter=Study"><Header /><Filter val={'Study'} /><StudyTime /></Route>
        <Route path="/summaryFilter=Free"><Header /><Filter val={'Free'} /><FreeTime /></Route>
      </Router>
    </div>
  )
}

