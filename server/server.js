var express = require("express");
var bodyParser = require("body-parser");
var Pusher = require("Pusher");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("dotenv").config();

var pusher = new Pusher({
    appId: '814476',
    key: 'eda76d3821ae07a5a540',
    secret: '60adf57c390e4430b1ff',
    cluster: 'us3',
    encrypted: true
});

app.get("/", function (req, res) {
    // check if server works
    res.send("Server working")
});

app.post("/pusher/auth", function(req, res) {
    var username = req.body.username;
    var pokemon_ids = req.body.pokemon_ids;
    var team_member_ids = req.body.team_member_ids;
  
    console.log("pokemon ids: ", pokemon_ids);
    console.log("team member ids: ", team_member_ids);
  
    let user_index = users.findIndex(item => {
      return item.username == username;
    });
  
    if (user_index === -1) {
      // replace with find
      users.push({
        username: username,
        pokemon_ids: pokemon_ids,
        team_member_ids: team_member_ids
      });
  
      if (users.length == 2) {
        var player_one_index = 0;
        var player_one = users.splice(player_one_index, 1)[0];
  
        var player_two_index = 0;
        var player_two = users.splice(player_two_index, 1)[0];
  
        // trigger a message to each players. the message contains the IDs of the Pokemon of their opponent
  
        pusher.trigger("private-user-" + player_one.username, "opponent-found", {
          player_one: player_one,
          player_two: player_two
        });
  
        setTimeout(() => {
          pusher.trigger(
            "private-user-" + player_two.username,
            "opponent-found",
            {
              player_one: player_one,
              player_two: player_two
            }
          );
        }, 3000);
      }
  
      var socketId = req.body.socket_id;
      var channel = req.body.channel_name;
      var auth = pusher.authenticate(socketId, channel);
  
      res.send(auth);
    } else {
      res.status(400);
    }
  });
  
  var port = process.env.PORT || 5000;
  app.listen(port);