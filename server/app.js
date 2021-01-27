const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./routes/routes.js');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    const env_req = require('dotenv').config();
  }

var port = process.env.PORT || 8081;
var server = app.listen(port, () => {
	console.log('Server started on port ' + port);
});

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static(__dirname + '/public'));


//Routes
app.get('/getUser:username', routes.getUser);
app.post('/checkLogin/:username/:password', routes.checkLogin);
app.post('/signUp/:username/:password/:first/:last', routes.signUp);
app.get('/getRecs', routes.getRecs);
app.post('/updateUserInfo/:username', routes.updateUserInfo);
app.get('/getSession', routes.getSession);
app.post('/logout', routes.logout);