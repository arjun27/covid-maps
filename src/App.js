import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Homepage from "./Homepage";
import SubmitPage from "./SubmitPage";
import AboutPage from "./AboutPage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ReactGA from 'react-ga';

function AppNavbar() {
  return (
    <Navbar bg="light" variant="light" fixed="top">
      <Navbar.Brand className="navbar-brand">
        <Link to="/">
          <strong style={{ color: "#808080" }}>covidmaps</strong>
          <span style={{ color: "#b3b3b3" }}>.in</span>
        </Link>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Link to="/submit">
          <Button size="sm" variant="info">
            <strong>Update a Store</strong>
          </Button>
        </Link>
      </Nav>
    </Navbar>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <div className="page">
          <Switch>
            <Route path="/submit" component={SubmitPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/" component={Homepage} />
          </Switch>
        </div>
        <footer>
          <div className="container py-4">
            <Link to="/about">About</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function initializeReactGA() {
  ReactGA.initialize('UA-162047555-1');
  ReactGA.pageview('/');
}
