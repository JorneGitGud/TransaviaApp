import Navbar from './Navbar'
import Home from './views/Home'
import Tickets from './views/Tickets'
import Results from './views/Results'
import About from './views/About'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  return (
  
      <Router>
        <div className="App">
        <div className="bkgr">
      </div>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/Tickets">
                <Tickets />
              </Route>
              <Route path="/Results">
                <Results />
              </Route>
              <Route path="/About">
                <About />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
