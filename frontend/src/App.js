import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ChatGroup from "./components/ChatGroup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/chat/:groupId" component={ChatGroup} />
      </Switch>
    </Router>
  );
}

export default App;
