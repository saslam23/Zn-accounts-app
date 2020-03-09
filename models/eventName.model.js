const mongoose = require("mongoose");


eventSchema = {
    event:{
    type: String,
    unique: true,
    minlength: 3
}, email:{type: String, required: true}
}

const Event = mongoose.model("Event", eventSchema)

module.exports = Event;