const router = require("express").Router();
const Event = require("../models/eventName.model");


router.route("/").get((req,res) => {
    const email = req.user.email
    Event.find({email})
    .then(event => res.json(event))
    .catch(err => res.status(400).json("Error: " + err))

})

router.route("/add").post((req,res) =>{
    const event = req.body.event;
    const email = req.user.email;
    const newEvent = new Event({
        event,
        email
    })

    newEvent.save()
    .then(() => res.json("New event added!")) 
    .catch(err => res.status(400).json("Error: " + err))
})


router.route("/:id").delete((req,res)=> {
    Event.findByIdAndDelete(req.params.id)
    .then(()=> res.json("deleted successfully"))
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;