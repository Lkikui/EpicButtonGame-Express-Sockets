/*---------- modules ----------*/
//express
var express = require( "express");
var app = express();

//path
var path = require( "path");

//static 
app.use(express.static(path.join(__dirname, "./static")));

//views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

/*---------- route ----------*/
//renders index page
var counter = 0;

app.get('/', function(request, response) {
    response.render("index");
});

/*---------- port ----------*/
var server = app.listen(8000, function() {
    console.log("EpicButtonGame Project listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    counter = 0;

    socket.on("button_clicked", function (counter){
        console.log(`increment! counter: ${counter}`)

        //EMITç
        io.emit('updated_counter', counter);
    });

    socket.on("reset_counter", function (counter) {
        console.log(`reset! counter: ${counter}`);
        io.emit('reset_counter', counter);
    })
});

