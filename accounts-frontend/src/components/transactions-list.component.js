import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { CSVLink } from "react-csv";

const Transaction = props => {
    return (
        <tr>
            <td>{props.transaction.category}</td>
            <td>{props.transaction.event}</td>
            <td>{props.transaction.amount}</td>
            <td>{props.transaction.date.substring(0, 10)}</td>
            <td>
                <button className=" btn-danger btn-outline-light btn-sm" href="#" onClick={() => { props.deleteTransaction(props.transaction._id) }}>delete</button>
            </td>
        </tr>
    )
}


export default class TransactionsList extends Component {
    constructor(props) {
        super(props);

        this.deleteTransaction = this.deleteTransaction.bind(this);

        this.state = { transactions: [] }
    }

    /**
     * componentDidMount method will cause whatever is in it to be render before anything else.
     * response.data is the code that will retrieve the data from the designated route and that is what we set the state as.
     */

    componentDidMount() {

        axios.get("/transactions/")
            .then(response => {
                this.setState({ transactions: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

    }
    /**
     * DELETE TRANSACTION
     * We connect to the delete route in the backend and let it run.
     * After the specified id has been deleted, we want to re-render the transactions list but updated
     * Using the filter, anything _id that does not equal the id in the question for deletion will be rendered.
     */
    deleteTransaction(id) {
        axios.delete("/transactions/" + id)
            .then(res => console.log(res.data));
        this.setState({
            transactions: this.state.transactions.filter(el => el._id !== id)
        })
    }

    transactionList() {
        return this.state.transactions.map(thistransaction => {
            return <Transaction transaction={thistransaction} deleteTransaction={this.deleteTransaction} key={thistransaction._id} />
        })
    }
    render() {
        const headers = [
            { label: "category", key: "category" },
            { label: "event", key: "event" },
            { label: "amount", key: "amount" },
            { label: "date", key: "date" }
        ]

        const isAuthenticated = window.localStorage.getItem("isAuthenticated");

        if (!isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <br></br>
                <h3 className="text-center">Logged Transactions</h3>
                <button style={{backgroundColor:'#10adeb'}} className=" btn-sm btn-outline-light ">
                    <CSVLink style={{ color: "white" }} data={this.state.transactions} headers={headers}> Export </CSVLink>
                </button>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Category</th>
                            <th>Event</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.transactionList()}
                    </tbody>
                </table>
            </div>

        )
    }

}