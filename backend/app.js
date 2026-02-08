//import express module
const express = require("express");
//import cors module
const cors = require("cors");
// importation mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sportDB');
const ObjectId = require('mongoose').Types.ObjectId;

//import multer module
const multer = require("multer");

const axios = require("axios");



//creates an express application named 'app'
const app = express();



// model importation

const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");
const Stadium = require("./models/stadium");
const match = require("./models/match");
const path = require("path");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

//app configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const secretKey = 'croco2026FSJS-soir';
app.use(session({
    secret: secretKey,
}));

app.use('/images', express.static(path.join('backend/uploads')))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//routes files importation
const matchRoutes = require("./routes/match-routes");

app.use("/matches",matchRoutes);
//data base simulation
let matchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 1, teamOne: "SEN", teamTwo: "EGY" },
    { id: 2, scoreOne: 2, scoreTwo: 1, teamOne: "FCB", teamTwo: "ARS" },
    { id: 3, scoreOne: 2, scoreTwo: 1, teamOne: "FCB", teamTwo: "RMD" },
];

let teamTab = [
    { id: 1, name: "ESZ", fondation: 1992, owner: "TALEB" },
    { id: 2, name: "RMD", fondation: 1990, owner: "PEREZ" },
    { id: 3, name: "CA", fondation: 1920, owner: "TRABELSI" },
];
let playerTab = [
    { id: 1, name: "MESSI", age: 40, position: "ATT", nbr: 10, teamId: 1 },
    { id: 2, name: "CR7", age: 40, position: "ATT", nbr: 7, teamId: 3 },
    { id: 3, name: "KROS", age: 40, position: "CMD", nbr: 8, teamId: 1 },
];
let stadiumTab = [
    { id: 1, name: "RADES", country: "TUNIS", capacity: 60, teamId: 3 },
    { id: 2, name: "KAZOUZ", country: "ZARZIS", capacity: 20, teamId: 1 },
    { id: 3, name: "MANZAH", country: "TUNIS", capacity: 30, teamId: 2 },
];

// business logic


app.get("/players/serchByName/:playerName", (req, res) => {
    console.log("business logic : get player by name");
    let playerName = req.params.playerName;
    console.log("here is playerName", playerName);
    let player = playerTab.find((el) => el.name == playerName);

    if (!player) {
        return res.json({ msg: `not found player with name : ${playerName}` });
    }

    let team = teamTab.find(elt => elt.id === player.teamId);

    res.json({
        PLAYER: player,
        TEAM: team || null
    });

});

app.get("/teams/serchByName/:teamName", (req, res) => {
    console.log("business logic : get team by name");
    let teamName = req.params.teamName;
    console.log("here is teamName", teamName);
    let team = teamTab.find((el) => el.name == teamName);

    if (!team) {
        return res.json({ msg: `not found team with name : ${teamName}` });
    }

    let player = playerTab.filter((el) => el.teamId == team.id);

    res.json({

        TEAM: team,
        PLAYER: player || null
    });

});


app.post("/stadiums", (req, res) => {
    console.log("business logic : add stadium ");

    Team.findById(req.body.teamId).then(
        (foundTeam) => {
            console.log("here is found team", foundTeam);
            if (!foundTeam) {
                return res.json({ msg: "team not found !!!" });
            }

            req.body.teamId= new ObjectId(req.body.teamId);
            let stadium = new Stadium(req.body);
            stadium.save((err, doc) => {
                 if (err) {
                        res.json({ msg: "stadium not saved" });
                    } else {
                        foundTeam.satadiumId = doc._id;
                        foundTeam.save();
                        res.json({ msg: "stadium saved with succsess" });
                    }
            });

        })

});

app.get("/satdium", (req, res) => {
    console.log("business logic : get all satdium");
    res.json({ T: stadiumTab })
});

app.get("/satdium/serch/:satdiumName", (req, res) => {
    console.log("business logic : get satdium by name");
    let satdiumName = req.params.satdiumName;
    console.log("here is satdiumName", satdiumName);
    let obj = stadiumTab.find((elt) => elt.name == satdiumName);
    (!obj) ? res.json({ msg: `not found satdium with team name : ${satdiumName}` }) : res.json({ satdium: obj });

});


app.get("/stadium/searchStadiumAndTeam/:stadiumName", (req, res) => {
    console.log("business logic : get stadium & team by stadiumName");

    let stadiumName = req.params.stadiumName;
    console.log("here is stadiumName", stadiumName);

    let stadium = stadiumTab.find(elt => elt.name === stadiumName);

    if (!stadium) {
        return res.json({
            msg: `not found stadium with name : ${stadiumName}`
        });
    }

    let team = teamTab.find(elt => elt.id === stadium.teamId);

    res.json({
        STADIUM: stadium,
        TEAM: team || null
    });
});


// logique business player

app.get("/players", (req, res) => {
    console.log("business logic : get all player");
    Player.find().populate("teamId").then((tab) => {
        console.log("here is tab", tab);
        res.json({ players: tab });
    });
});

app.get("/players/:id", (req, res) => {
    console.log("business logic : get player by id");
    let playerId = req.params.id;
    console.log("here is playerId", playerId);
    let obj = playerTab.find((elt) => elt.id == playerId);
    (!obj) ? res.json({ msg: "not found" }) : res.json({ T: obj });

});

app.delete("/players/:id", (req, res) => {
    console.log("business logic : delete player by id");

    let playerId = req.params.id;
    console.log("here is playerId", playerId);

    let pos = playerTab.findIndex((elt) => elt.id == playerId);
    console.log("here is position", pos);

    if (pos == -1) {
        res.json({ msg: `player N°${playerId} is not found` });
    } else {
        playerTab.splice(pos, 1);
        res.json({ msg: `player N°${playerId} is deleted` });
    }


});

app.post("/players", (req, res) => {
    Team.findById(req.body.teamId).then(
        (foundTeam) => {
            console.log("here is found team", foundTeam);
            if (!foundTeam) {
                return res.json({ msg: "team not found !!!" });
            }
            let playerObj = new Player({
                name: req.body.name,
                age: req.body.age,
                position: req.body.position,
                nbr: req.body.nbr,
                teamId: new ObjectId(req.body.teamId)
            });
            playerObj.save(
                (err, doc) => {
                    if (err) {
                        res.json({ msg: "player not saved" });
                    } else {
                        foundTeam.playersId.push(doc._id);
                        foundTeam.save();
                        res.json({ msg: "player saved with succsess" });
                    }
                }
            );

        }
    )


});

app.put("/players", (req, res) => {
    console.log("business logic : edit player ");
    let player = req.body;
    console.log("here is player object ", player);
    let pos = playerTab.findIndex((elt) => elt.id == player.id);
    if (pos == -1) {
        res.json({ msg: `player  is not found` });
    } else {
        playerTab[pos] = player;
        res.json({ msg: `player edited withe success` });
    }

});


// logique business teams

app.get("/teams", (req, res) => {
    console.log("business logic : get all teams");
    Team.find().populate("playersId").then((tab) => {
        console.log("here is tab", tab);
        res.json({ teams: tab });
    });
});



app.get("/teams/:id", (req, res) => {
    console.log("business logic : get team by id");
    let teamId = req.params.id;
    console.log("here is teamId", teamId);
    let obj = teamTab.find((elt) => elt.id == teamId);
    (!obj) ? res.json({ msg: "not found" }) : res.json({ T: obj });

});

app.delete("/teams/:id", (req, res) => {
    console.log("business logic : delete team by id");

    let teamId = req.params.id;
    console.log("here is teamId", teamId);

    let pos = teamTab.findIndex((elt) => elt.id == teamId);
    console.log("here is position", pos);

    if (pos == -1) {
        res.json({ msg: `team N°${teamId} is not found` });
    } else {
        teamTab.splice(pos, 1);
        res.json({ msg: `team N°${teamId} is deleted` });
    }


});

app.post("/teams", (req, res) => {
    console.log("business logic : add team ");

    let team = new Team(req.body);
    team.save((err, doc) => {
        console.log("here is error", err);
        console.log("here is document(+)", doc);

        err ? res.json({ msg: "team not add " }) : res.json({ msg: "team  add avec success " })
    });

});

app.put("/teams", (req, res) => {
    console.log("business logic : edit team ");
    let team = req.body;
    console.log("here is team object ", team);
    let pos = teamTab.findIndex((elt) => elt.id == team.id);
    if (pos == -1) {
        res.json({ msg: `team  is not found` });
    } else {
        teamTab[pos] = team;
        res.json({ msg: `team edited withe success` });
    }

});


// logique business user

app.post("/users/signup", multer({ storage: storage }).single("img"), (req, res) => {
    console.log("business logic : add user ", req.body);

    let user = new User(req.body);

    User.findOne({ email: user.email }).then(
        (founUser) => {
            console.log("here is foundUser ", founUser);
            if (!founUser) {
                bcrypt.hash(user.pwd, 10).then(
                    (cryptePwd) => {
                        console.log("here is crypted pw", cryptePwd);
                        user.pwd = cryptePwd;

                        user.photo = (req.file) ?
                            "http://localhost:3000/images/" + req.file.filename :
                            user.photo = "http://localhost:3000/images/a.png";


                        let userObj = new User(user);
                        userObj.save(
                            (err, doc) => {
                                err ? res.json({ msg: "3" }) : res.json({ msg: "1" });

                            }
                        )
                    }
                )
            } else {
                res.json({ msg: "2" });
            }
        }
    )



});

app.post("/users/login", (req, res) => {
    console.log("business logic : login user ", req.body);

    User.findOne({ email: req.body.email }).then(
        (founUser) => {
            console.log("here is foundUser ", founUser);
            if (!founUser) {
                return res.json({ msg: "1" });
            }
            bcrypt.compare(req.body.pwd, founUser.pwd).then(
                (pwdResult) => {
                    console.log("here is pwd result ", pwdResult);
                    if (!pwdResult) {
                        return res.json({ msg: "2" });
                    }
                    let userToSend = {
                        role: founUser.role,
                        fName: founUser.firstName,
                        lName: founUser.lastName,
                        _id: founUser._id
                    }
                    let token = jwt.sign(userToSend, secretKey, { expiresIn: "1d" });
                    res.json({ msg: "3", user: token });
                }
            )
        }


    )


});




app.post("/teamTest",(req,res)=> {
    console.log("bussnis logique team test", req.body);
    let apiKey = "9d1a869d097f7f85e095b430fc1046edab5849b2a5b3842cf9399e373e0f5de2";
    let apiURL = `https://apiv2.allsportsapi.com/football/?&met=Teams&teamName=${req.body.name}&APIkey=${apiKey}`;
    axios.get(apiURL).then(
        (apiResponse)=>{
            console.log("here is response from sport api",apiResponse.data);
            res.json({sportResponse : apiResponse.data});
        }
        
    )
    
    

});


app.post('/matches/search', (req, res) => {
  console.log('business logic: search match', req.body);

  match.find({
    $or: [
      { teamOne: req.body.team },
      { teamTwo: req.body.team }
    ]
  }).then((matches) => {
    if (matches.length === 0) {
      return res.json({ msg: 'No match found' });
    }
    res.json({ matches });
  }).catch(err => {
    res.json({ msg: 'Error', error: err });
  });
});


//make app importable from another files
module.exports = app;
