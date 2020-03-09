import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Field = props => {
    return (
        <tr>
            <td>{props.field.event}</td>
            <td>
                <button className=" btn-danger btn-outline-light btn-sm" href="#" onClick={() => { props.deleteField(props.field._id) }}>delete</button>
            </td>
        </tr>
    )
}


export default class FieldList extends Component {
    constructor(props) {
        super(props);

        this.deleteField = this.deleteField.bind(this);

        this.state = {
            events: []
        }
    }


    componentDidMount() {
        axios.get("/fields/")
            .then(response => {
                this.setState({ events: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

    }
    deleteField(id) {
        axios.delete("/fields/" + id)
            .then(res => console.log(res.data));
        this.setState({
            events: this.state.events.filter(el => el._id !== id)
        })
    }

    fieldsList() {
        return this.state.events.map(thisfield => {
            return <Field field={thisfield} deleteField={this.deleteField} key={thisfield._id} />
        })
    }
    render() {

        const isAuthenticated = window.localStorage.getItem("isAuthenticated");

        if (!isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h3 className="text-center">Dropdown Options</h3>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Event</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fieldsList()}
                    </tbody>
                </table>
            </div>

        )
    }

}