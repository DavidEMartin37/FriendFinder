var friends = require('../data/friends')

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
   
    return res.json(friends);
  });
  app.post("/api/friends", function (req, res) {
    var match = {
      name: "",
      photo: "",
      friendDiff: 1000
    };

    var user = req.body;
    var userScores = user.scores;
    console.log("2 is user: " + user.name);
    var totalDiff;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDiff = 0;
      console.log("Current friend: " + currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
        totalDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDiff < match.friendDiff) {
        match.name = currentFriend.name;
        match.photo = currentFriend.photo;
        match.friendDiff = totalDiff;
      }
    }

    friends.push(user);
    console.log("=======" + match.name);
    res.json(match);
  });
}

