const request = require('request');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({ extname: '.hbs' }));

app.set("PORT", PORT);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render("index", {title: "MeetPass"});
});

app.get('/:cID', function (req, res) {
  var cID = req.params.cID;

  request(`https://meetpass-server.herokuapp.com/cards/1/${cID}`, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var card = JSON.parse(body);
      res.render("card", { title: `MeetPass - ${card.cardName}`, accounts: card.accounts, card: card});
    }
    else {
        //Make a 404 page and insert here
        res.send("This card does not exist.");
    }
  });
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT'));
});
