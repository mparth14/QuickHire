import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import SignUp from './Components/Authentication/Signup/Signup';
import SignUpSeller from './Components/SignUpSeller/signupseller';
import Checkout from './Components/Checkout/Checkout';
import Payment from './Components/Payment/Payment';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Header />
        <Switch className="remainingBody">
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signup'>
            <SignUp/>
          </Route>
          <Route exact path='/signupseller'>
            <SignUpSeller />
          </Route>
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
          <Route exact path='/payment'>
            <Payment />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
