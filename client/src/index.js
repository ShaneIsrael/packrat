import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

import './styles/global.scss';

// Use Link from react-router-dom in the navbar to link to pages wherever
// the navbar is created. <Link to="/myPage">My Page</Link>
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
