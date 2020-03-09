import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, withRouter} from "react-router-dom";

import Input from "./components/create-transaction.component";
import Navbar from "./components/Navbar.component";
import TransactionsList from "./components/transactions-list.component";
import CreateField from "./components/create-field.component";
import FieldList from "./components/field-list.component";
import Signup from "./components/signup.component";
import Login from "./components/login.component";

const Main = withRouter(({ location }) => {
  return(
    <div>
    <div className="container">


      {
        location.pathname !== "/signup" &&  location.pathname !== "/" && <Navbar />
      }
      <Route path="/" exact component= {Login}/>
      <Route path="/create" component = {Input}/>
      <Route path="/list" component = {TransactionsList}/>
      <Route path="/field" component = {CreateField}/>
      <Route path="/dropdown" component= {FieldList}/>
      <Route path="/signup" component = {Signup}/>
      

    </div>
    </div>
  )
})



function App() {
  return (
    <Router>
      <Main/>
    </Router>
   
  );
}

export default App;
