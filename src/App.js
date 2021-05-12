import Navbar from './Components/Navbar'
import Home from './views/Home'
import Tickets from './views/Tickets'
import About from './views/About'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//this class manages links, backgrounds, components
function App() {

  return (
    <Router>
      <div className="app">
        <div className="background">
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
