import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom"

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: ''
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })

    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const credentials = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/user/signup", credentials)
            .then(response =>{
                const responseName = response.data.user.name
                const isAuthenticated = response.data.user.isAuthenticated;
                window.localStorage.setItem("name", responseName);
                window.localStorage.setItem("isAuthenticated", isAuthenticated)
                {this.props.history.push("/create")}})
            .catch(
                err =>{
                    this.setState({
                        errorMessage: "email and password is required or username already exists"
                    })
                }
            )
    }
    render() {
        const isAuthenticated = window.localStorage.getItem("isAuthenticated");
        // This doesn't automatically redirect after login.  This only redirects if after login
        // we attempt to go back to the login page, then we get redirected to the home page.
        if (isAuthenticated) {
            return <Redirect to="/create" />
        }

        return (
            <div>
                <div>
                    <br></br>

                    <div>
                        <div className="col-sm-6 card container">
                            <div>
                                <div className="card-body">
                                    <h1>Sign Up</h1>

                                    <form action="/signup" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="name" className="form-control" name="name" placeholder="name" value={this.state.name} onChange={this.onChangeName} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" placeholder="email" onChange={this.onChangeEmail} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" name="password" onChange={this.onChangePassword} placeholder="password" />
                                        </div>
                                        <div>
                                        {this.state.errorMessage ? <p className = "alert alert-danger">{this.state.errorMessage}</p> : null }
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-danger col-sm-6"> Sign up! </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}