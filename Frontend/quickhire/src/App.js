import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Home from "./Components/Home/Home"

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Header />        
        <Switch>
          <Route exact path ="/">
            <Home />
          </Route>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
