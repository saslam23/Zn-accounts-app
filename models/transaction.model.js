const mongoose = require("mongoose");

const transactionSchema = {
    category: { type: String, required: true },
    event: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true}
}

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;