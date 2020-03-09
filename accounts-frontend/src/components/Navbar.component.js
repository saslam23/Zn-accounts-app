import React, { Component } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.onSubmitLogout = this.onSubmitLogout.bind(this);
    }


    onSubmitLogout() {

        axios.get("/user/logout")
            .then(localStorage.clear()

            )
            .catch(err => console.log(err))

        window.location = '/';
    }



    render() {
    const responseName = window.localStorage.getItem("name");

        return (
            <div>
                <p style={{fontWeight:"bold", fontSize: "20pt"}}>Welcome, {responseName}</p>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" style={{ fontSize: "20pt" }} className="navbar-brand"><img src={process.env.PUBLIC_URL + "/assets/zn.png"} alt="Znlogo" className="Znlogo d-block mx-auto" /></Link>
                <div className=" navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/list" className="nav-link">Entries</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/field" className="nav-link">Create New Event</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dropdown" className="nav-link">Events</Link>
                        </li>
                    </ul>
                    <button style={{ color: "white" }} className=" btn-sm btn-danger" onClick={() => this.onSubmitLogout()}>Logout</button>
                </div>
            </nav>
            </div>
        )
    }
}
