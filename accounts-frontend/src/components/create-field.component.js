import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreateField extends Component {
    constructor(props) {
        super(props)

        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            event: ''
        }
    }

    onChangeEvent(e) {
        this.setState({
            event: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const fieldChange = {
            event: this.state.event
        }
        console.log(fieldChange);

        axios.post("/fields/add", fieldChange)
            .then(res => console.log(res.data));

        this.setState({
            event: ''
        })

    }


    render() {
        const isAuthenticated = window.localStorage.getItem("isAuthenticated");

        if (!isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h3 className="text-center">Create Dropdown Options</h3>
                <form className="container" onSubmit={this.onSubmit} id="dropdownMenuButton" style={{ fontSize: "18pt" }}>
                    <div className="form-group">
                        <label>Enter an Event</label>
                        <input type="text" className="form-control" required value={this.state.event} onChange={this.onChangeEvent} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-md" type="submit">Add</button>

                    </div>
                </form>
            </div>
        )
    }
}