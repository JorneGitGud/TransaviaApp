import Navbar from './Navbar'
// import Home from './views/Home'
import Tickets from './views/Tickets'
import Results from './views/Results'
function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Tickets/>
        {/* <Results/> */}
      </div>
    </div>
  );
}

export default App;
