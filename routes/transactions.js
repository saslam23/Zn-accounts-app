const router = require("express").Router();
const Transaction = require("../models/transaction.model");
const passport = require("../Passport");
const User = require("../models/user.model");




/**
 * GET
 * For the list route, we want to retrieve all the listings of transactions in our monogoDB
 */
router.route('/').get((req, res) => {
   const email = req.user.email;
    Transaction.find({email})
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json("error: " + err));
});

/**
 * POST
 * For the post route, we want to be able to add new entries into our database revolving around our schema
 * We will use express body parser to make request from our frontend and store them
 * Then we ask the route to create a new transaction entry following the schema 
 */
router.route('/add').post((req, res) => {
    const category = req.body.category;
    const event = req.body.event;
    const amount = Number(req.body.amount);
    const date = Date.parse(req.body.date);
    const email = req.user.email;

    const newTransaction = new Transaction({
        category,
        event,
        amount,
        date,
        email
    });
    console.log(req.user.email)
    newTransaction.save()
        .then(() => res.json("Successfuly added transaction"))
        .catch(err => res.status(400).json("error: " + err))
})

/**
 * GET ID
 * We want to be able to retrieve a specific entry by id so that we can edit and update it
 */
router.route("/:id").get((req, res) => {
    Transaction.findById(req.params.id)
        .then(foundTransaction => res.json(foundTransaction))
        .catch(err => res.status(400).json("Error: " + err));
});

/**
 * DELETE ID
 * This route deletes a specific id by calling the findbyIdAndDelete() mongoose method which takes in the req.params.id argument.
 * The request.params.id allows us to take the id in the url as the argument
 * then we return a promise to give us feedback
 */

router.route("/:id").delete((req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(() => res.json("deleted successfully"))
        .catch(err => res.status(400).json("Error: " + err));
});


/**
 * UPDATE ID
 * This route updates a specific id by calling the findbyIdAndUpdate() mongoose method which takes in the req.params.id argument.
 * The request.params.id allows us to take the id in the url as the argument.
 * then we return a promise to assign new values to the id in question.
 */
router.route("/update/:id").post((req, res) => {
    Transaction.findByIdAndUpdate(req.params.id)
        .then(updatedTransaction => {
            updatedTransaction.category = req.body.category;
            updatedTransaction.event = req.body.event;
            updatedTransaction.amount = req.body.amount;
            updatedTransaction.date = Date.parse(req.body.date);

            updatedTransaction.save()
                .then(() => res.json("successfully updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
})


module.exports = router;