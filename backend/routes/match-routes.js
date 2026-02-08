//import express model
const express = require("express");

//mini router for navigatino
const router = express.Router();

const Match = require("../models/match");

router.get("/", (req, res) => {
    console.log("business logic : get all matches");
    Match.find().then((tab) => {
        console.log("here is tab", tab);
        res.json({ matches: tab });
    });
});

router.get("/:id", (req, res) => {
    console.log("business logic : get matche by id");
    let matcheId = req.params.id;
    console.log("here is matcheId", matcheId);

    Match.findById(matcheId).then((doc) => {
        console.log("hehr is doc from matches collection", doc);
        doc ? res.json({ matche: doc }) : res.json({ msg: "matche not found" });
    });




});

router.delete("/:id", (req, res) => {
    console.log("business logic : delete matche by id");

    let matcheId = req.params.id;
    console.log("here is matcheId", matcheId);



    Match.deleteOne({ _id: matcheId }).then((msg) => {
        console.log("hehe id delete response from matches collection", msg);
        (msg.deletedCount == 1) ?
            res.json({ message: "matche deleted with success", isDeleted: true }) :
            res.json({ message: "matche is not deleted", isDeleted: false });
    });


});

router.post("/", (req, res) => {
    console.log("business logic : add matche ");

    let match = new Match(req.body);
    match.save((err, doc) => {
        console.log("here is error", err);
        console.log("here is document(+)", doc);

        err ? res.json({ msg: "matche not add " }) : res.json({ msg: "matche  add avec success " })
    });



});

router.put("/", (req, res) => {
    console.log("business logic : edit matche ");
    let matche = req.body;
    console.log("here is matche object ", matche);
    Match.updateOne({ _id: matche._id }, matche).then((updateResponse) => {
        console.log("here is update response", updateResponse);
        (updateResponse.nModified == 1) ?
            res.json({ message: "matche edited  with success", isUpdate: true }) :
            res.json({ message: "matche is not edited", isUpdate: false });

    })

});

router.get("/serch/:TeamName", (req, res) => {
    console.log("business logic : get matche by name");
    let matcheName = req.params.TeamName;
    console.log("here is matcheName", matcheName);
    Match.find({ $or: [{ teamOne: matcheName }, { teamTwo: matcheName }] }).then(
        (tab) => {
            console.log("hehr is doc from matches collection", tab);
            (tab.length == 0) ?
                res.json({ msg: `not found matches with team name : ${matcheName}` }) :
                res.json({ matches: tab });


        });

    // let obj = matchesTab.filter((elt) => elt.teamOne == matcheName || elt.teamTwo == matcheName);
    //(obj.length == 0) ? res.json({ msg: `not found matches with team name : ${matcheName}` }) : res.json({ T: obj });



});

// make router exportable
module.exports = router;