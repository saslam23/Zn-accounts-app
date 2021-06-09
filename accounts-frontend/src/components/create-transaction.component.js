import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";



export default class Input extends Component {
  constructor(props) {
    super(props);
    // Because this will we returned as "undefined", we bind "this" to the handlers within the class component
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onSubmit = this.onSubmit.bind(this);


    /*Here, we have created our variables by using this.state, and these variables correspond to the field names in our database*/
    this.state = {
      category: '',
      event: '',
      amount: '',
      date: new Date(),
      events: [],
      categoryError: "",
      amountError: "",
      eventError: ""
    }
  }

  componentDidMount() {
    axios.get("/fields/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            events: response.data.map(evnt => evnt.event),
            event: response.data[0].event
          })
        }
      })


  }

  /**
   * onChange() handler
   * Next, we will add methods which will be used to update our state properties
   * instead of giving a hard coded value to the field, we will use this.setState which will
   * allow us to set the value of the updated field to whatever is inputted from the dropdown menu using e.target.value
   * We do this for all of the fields
   */

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })

  }
  onChangeEvent(e) {
    this.setState({
      event: e.target.value
    })

  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })

  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  /**
   * LOGOUT HANDLER
   * This is where we will make a request upon submission of the button to delete the session, log out the user
   * and redirect them back to the login page.
   */


  /**
   * VALIDATION ERRORS
   * To validate whether the fields needed to submit the form were entered.
   * We started by creating a state that corresponded to the error message that would be received. (i.e. amountError)
   * Next, we created a validate function that would be passed and run once the submit handler was run
   * In the validate function, error variables with empty strings were created.  Then conditionals were created to check if the input fields had values that were valid for submission
   * If not, then we returned the error state and a string with the error message
   * The function was "return true" if no errors were evident. 
   */

  validate = () => {
    let categoryError = "";
    let amountError = "";
    let eventError = "";

    if (!this.state.category) {
      categoryError = "Please enter a category";
    }
    if (this.state.event.includes("Choose...")) {
      eventError = "Please enter an event"
    }
    if (!this.state.amount) {
      amountError = "Please enter an amount";
    }
    if (categoryError || amountError || eventError) {
      this.setState({ categoryError, amountError, eventError });
      return false;
    }
    return true;
  }

  /**
   * Here, we will create and onSubmit() handler which will take the values from our form and send them over to our database
   */





  onSubmit(e) {
    e.preventDefault();
    // Within the handler, values from the fields in the state are stored as a variable called transaction


    const isValid = this.validate();

    if (isValid) {
      const transaction = {
        category: this.state.category,
        event: this.state.event,
        amount: this.state.amount,
        date: this.state.date
      }

      console.log(transaction);


      axios.post("/transactions/add", transaction)
        .then(res => console.log(res.data));

      window.location = '/list'; // redirects back to home page
    }


  };



  render() {
    const isAuthenticated = window.localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      alert("You must Login")
      return <Redirect to="/" />
    }

    return (
      <div>
        <div>
          <form className="container" onSubmit={this.onSubmit}>
            <div className="text-center" id="dropdownMenuButton">
              <label className="label">Category</label>
              <br></br>
              <br></br>
              <select className="custom-select custom-select-md mb-3" id="list" value={this.state.category} onChange={this.onChangeCategory}>
                <option>Choose...</option>
                <option>Vendor</option>
                <option>Sponsor</option>
                <option>Item</option>
                <option>Miscellaneous</option>
                

              </select>
            </div>

            <div style={{ color: "red", fontSize: "14pt", textAlign: "center", fontWeight: "bold" }}>
              {this.state.categoryError}
            </div>

            <div className="text-center" id="dropdownMenuButton">
              <label className="label">Event</label>
              <br></br>
              <br></br>
              <select className="custom-select custom-select-md mb-3" id="list" value={this.state.event} onChange={this.onChangeEvent}>
                <option>Choose...</option>
                {this.state.events.map(function (evnt) {
                  return <option
                    key={evnt}
                    value={evnt}>{evnt}</option>
                })}
              </select>
            </div>

            <div style={{ color: "red", fontSize: "14pt", textAlign: "center", fontWeight: "bold" }}>
              {this.state.eventError}
            </div>

            <div className="container box text-center" id="dropdownMenuButton">
              <span className="currencyinput">$</span> <input
                style={{ color: '#10adeb' }}
                className="text-center btn"
                type="text"
                placeholder="Amount"
                value={this.state.amount}
                onChange={this.onChangeAmount} />
            </div>

            <div style={{ textAlign: "center", color: "red", fontSize: "14pt", fontWeight: "bold" }}>
              {this.state.amountError}
            </div>

            <div className="text-center" id="dropdownMenuButton">
              <br></br>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate} />
              </div>
              <br></br>
            </div>
            <div className="text-center">
              <button className="btn button-submit" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

