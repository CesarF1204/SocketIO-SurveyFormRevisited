const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
//body parse
app.use(bodyParser.urlencoded({extended: true}));
//views
app.use(express.static(__dirname + "/views"));
//css
app.use(express.static(__dirname + "/css"));
//ejs
app.set('view engine', 'ejs');
//routes
app.get("/", function(request, response) {
    response.render("index");
});
//port
const server = app.listen(1337, function() {
	console.log("listening on port 1337");
})
//socket.io
const io = require('socket.io')(server);    // 2. socket.io connection
io.sockets.on('connection', function(socket) {  // 3. Establishing a connection with user
    // console.log(socket);
	console.log("Connected: "+ socket.connected);
    console.log("Socket ID: "+ socket.id);
	socket.on("posting_form", function(data) { // 5. Passing the values of the form to the server
		console.log('You emitted the following information to the server:');
        console.log(data);
		socket.emit('updated_message', {name: data.name, location: data.location, language: data.language, comment: data.comment}); // 6. Getting the values of the form
		const random_number = Math.floor(Math.random() * 1000) + 1; // 8. Initializing a random number to a variable
		socket.emit('random_number', {randomNumber: random_number});
	})
})