const express = require("express");
const router = express.Router();
//bring in middleware
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

//@route Get api/items
//@desc Get All Items
//@access public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//@route POST api/items
//@desc Create A Post
//@access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc Delete A Item
//@access Private
router.delete("/:id", auth, (req, res) => {
  //first retrieve the old todo item from database based on its id usinf findById() method
  Item.findById(req.params.id) //use the req.params.id to delete a specific id 
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;