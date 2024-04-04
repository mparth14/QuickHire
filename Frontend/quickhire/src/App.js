/**
 * Main component for the application.
 * Handles routing and authentication.
 * @returns {JSX.Element} The rendered JSX element.
 */

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Features/Home/Home";
import SignUp from "./Features/Authentication/Signup/Signup";
import Checkout from "./Features/Checkout/Checkout";
import ContactUs from "./Features/ContactUs/ContactUs.js";
import "./App.css";
import FAQPage from "./Features/FAQ/FAQ";
import PaymentPage from "./Features/Payment/Payment.js";
import Navbar from "./CommonComponents/Navbar/Navbar.js";
import Header from "./CommonComponents/Header/Header.js";
import Footer from "./CommonComponents/Footer/Footer.js";
import ServiceOrdersView from "./Features/Services/ServiceOrders/ServiceOrdersView.js";
import ServiceCreationPage from "./Features/Services/ServiceCreationPage/ServiceCreationPage.js";
import ManageService from "./Features/Services/ManageService/ManageService.js";

import SubCategoryCard from "./Features/SubCategoryCard/SubCategoryCard.js";
import SubCategoryService from "./Features/SubCategoryService/SubCategoryService";
import WishList from "./Features/WishList/Wishlist.js";
import PaymentSuccess from "./Features/Payment/PaymentSuccess.js";
import PaymentFailure from "./Features/Payment/PaymentFailure.js";
import SignUpFreelancer from "./Features/SignUpFreelancer/SignUpFreelancer.js";
import IndividualServicePage from "./Features/Services/IndividualServicePage/IndividualServicePage.js";
import Login from "./Features/Authentication/Login/Login.js";
import { AuthProvider } from "./Features/AuthContext.js";
import ForgotPassword from "./Features/Authentication/ForgotPassword/ForgotPassword.js";
import ChangePassword from "./Features/Authentication/ChangePassword/ChangePassword.js";
import UserProfile from "./Features/UserProfile/UserProfile.js";

import axios from "axios";
import { toast } from "react-toastify";
import { CONFIG } from "./config.js";

function App() {
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup";
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      getUserDetails();
    } else {
      setUserLoaded(true);
    }
  }, []);

  /**
   * Fetches user details from the backend.
   */
  const getUserDetails = () => {
    axios
      .get(CONFIG.BASE_PATH + CONFIG.USER_PATH, {
        headers: { Authorization: "Bearer " + storedToken },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUser(response.data);
          setUserLoaded(true);
        }
      })
      .catch(function (error) {
        toast.error("Issue with authentication");
      });
  };

  return (
    <div>
      <Router>
        <Navbar user={user} onload={userLoaded} />
        <Header />
        <Switch className="remainingBody">
          <AuthProvider>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/forgot-password/">
              <ForgotPassword />
            </Route>
            <Route exact path="/change-password/:user_id/:token">
              <ChangePassword />
            </Route>
            <Route exact path="/register-freelancer">
              <SignUpFreelancer user={user} onload={userLoaded} />
            </Route>
            <Route exact path="/profile">
              <UserProfile
                user={user}
                onload={userLoaded}
                onUserUpdate={setUser}
              />
            </Route>
            <Route exact path="/checkout">
              <Checkout user={user} onload={userLoaded} />
            </Route>
            <Route exact path="/payment">
              <PaymentPage />
            </Route>
            <Route exact path="/faqs">
              <FAQPage />
            </Route>
            <Route exact path="/contact-us">
              <ContactUs />
            </Route>
            <Route exact path="/service-orders">
              <ServiceOrdersView user={user} onload={userLoaded} />
            </Route>
            <Route exact path="/service-creation">
              <ServiceCreationPage user={user} onload={userLoaded} />
            </Route>
            <Route exact path="/service-manage">
              <ManageService user={user} onload={userLoaded}/>
            </Route>
            <Route exact path="/services/:id">
              <IndividualServicePage user={user} onload={userLoaded} />
            </Route>
            <Route exact path="/category/:name">
              <SubCategoryCard />
            </Route>
            <Route exact path="/subcategory/:name">
              <SubCategoryService user={user} onload={userLoaded} />
            </Route>
            <Route exact path="/payment-success">
              <PaymentSuccess />
            </Route>
            <Route exact path="/payment-failure">
              <PaymentFailure />
            </Route>
            <Route exact path="/wishlist">
              <WishList user={user} onload={userLoaded} />
            </Route>
          </AuthProvider>
        </Switch>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
