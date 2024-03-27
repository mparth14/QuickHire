import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Features/Home/Home';
import SignUp from './Features/Authentication/Signup/Signup';
import SignUpSeller from './Features/SignUpSeller/signupseller';
import Checkout from './Features/Checkout/Checkout';
import ContactUs from './Features/ContactUs/ContactUs.js';
import './App.css';
import FAQPage from './Features/FAQ/FAQ';
import PaymentPage from './Features/Payment/Payment.js';
import Navbar from './CommonComponents/Navbar/Navbar.js';
import Header from './CommonComponents/Header/Header.js';
import Footer from './CommonComponents/Footer/Footer.js';
import ServiceOrdersView from './Features/Services/ServiceOrders/ServiceOrdersView.js';
import ServiceCreationPage from './Features/Services/ServiceCreationPage/ServiceCreationPage.js';

import CategoryCard from './Features/CategoryCard/CategoryCard';
import Blog from './Features/Blog/Blog';
import SubCategoryService from './Features/SubCategoryService/SubCategoryService';
import PaymentSuccess from './Features/Payment/PaymentSuccess.js';
import PaymentFailure from './Features/Payment/PaymentFailure.js';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Header />
        <Switch className='remainingBody'>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route exact path='/signupseller'>
            <SignUpSeller />
          </Route>
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
          <Route exact path='/payment'>
            <PaymentPage />
          </Route>
          <Route exact path='/faqs'>
            <FAQPage />
          </Route>
          <Route exact path='/contact-us'>
            <ContactUs />
          </Route>
          <Route exact path='/service-orders'>
            <ServiceOrdersView />
          </Route>
          <Route exact path='/service-creation'>
            <ServiceCreationPage />
          </Route>
          <Route exact path='/category/:name'>
            <CategoryCard />
            <Blog />
          </Route>
          <Route exact path='/subcategory/:name'>
            <SubCategoryService />
          </Route>
          <Route exact path='/payment-success'>
            <PaymentSuccess />
          </Route>
          <Route exact path='/payment-failure'>
            <PaymentFailure />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
