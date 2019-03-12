import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux-JS/store';
import Welcome from "./pages/Welcome";
import Bounties from "./pages/Bounties";
import User from "./pages/User";
import Create from "./pages/Create";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Sign from "./Components/Sign";
import Navbar from "./Components/Navbar";
import Dropdown from "./Components/Dropdown";
import Footer from "./Components/Footer";
import Wrapper from "./Components/Wrapper";
import LoginPage from './Components/LoginPage';
require('dotenv').config();

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID
} = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};



// console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render() {
    return (
      <Provider store={store}>
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <Router>
              <div>
                <Sign />
                <Navbar />
                <Dropdown />
                <Wrapper>
                  <Route exact path="/" component={Welcome} />
                  <Route exact path="/welcome" component={Welcome} />
                  <Route exact path="/bounties" component={Bounties} />
                  <Route exact path="/user" component={User} />
                  <Route exact path="/create" component={Create} />
                </Wrapper>
                <Footer />
              </div>
            </Router>


          </span>
        ) : (
            <span>
              <LoginPage />
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </span>
          )}
      </div>
      </Provider>
    )
  }
}

export default App
