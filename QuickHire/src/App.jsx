import SignUpSuccessMessage from './success-message/successMessage';
import SignUpComponent from './signup/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar/navbar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='content-container'>
          {' '}
          {/* Add a container for content */}
          <Routes>
            <Route exact path='/' element={<SignUpComponent />} />
            <Route exact path='/success' element={<SuccessWithNavbar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const SuccessWithNavbar = () => (
  <div>
    <SignUpSuccessMessage />
  </div>
);

export default App;
