import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom"

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReveal = this.onReveal.bind(this);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            reveal:false
        }
    }

    onReveal() {
        this.setState({
            reveal:!this.state.reveal
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
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/user/login", credentials)
            .then(response => {
                // Here we are getting the value of isAuthenticated form the server, which is true if username and password are valid
                // and we go through the req.login check in the login route
                const isAuthenticated = response.data.user.isAuthenticated;
                const responseName = response.data.user.name
                // Then we go ahead and store this value(of either true or false) to localstorage to be use in the render method
                window.localStorage.setItem("isAuthenticated", isAuthenticated)
                window.localStorage.setItem("name", responseName);
                this.props.history.push("/create");
            })
            .catch(error => {
                this.setState({
                    errorMessage: "invalid email or password"
                })
            });

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

                    <div >
                        <div className="login-form col-sm-6 container">
                            <div>
                                <div>
                                    <h1>Login</h1>

                                    <form action="/" onSubmit={this.onSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" placeholder="email" value={this.state.email} onChange={this.onChangeEmail} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangePassword} placeholder="password" />
                                        </div>
                                        <div>
                                            {this.state.errorMessage ? <p className="alert alert-danger">{this.state.errorMessage}</p> : null}
                                        </div>

                                        <button  type="submit" className="main-button col-sm-6">Login</button>
                                         
                                    </form>
                                    <button onClick={this.onReveal} style={{marginTop:'2rem'}} className="main-button">Show login creds</button>
                                    {this.state.reveal ?
                                        <div style={{border:'1px solid black', marginTop:'1rem', paddingLeft:'5px'}}>
                                            Email: demo@gmail.com
                                            <br></br>
                                            Password: hello
                                        </div>: null} 
                                    <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}