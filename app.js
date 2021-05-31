/**
 * Created by kaverma on 26-May-2021.
 * 
 *  APIs Detail:
 *  - http://localhost:3600/ = Host the HTML page.
 *  - http://localhost:3600/api/v1/robo-g-connect/socket.io = Socket IO.
 *  - http://localhost:3600/api/v1/{URI} = RESTFUL API.
 * 
 */

const pathURI = "/api/v1";
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io  = require('socket.io')(http, {
  path: `${pathURI}/robo-g-connect/socket.io`,
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const queryType = require('query-types');
const routes = require('./routes/index');
const dbConfig = require('./config/datasource');

/* Application Configuration */
(function applicationConfiguration(app) {
  /* ALLOW CORS , so that client machine can connect with server */
  app.use(function(request, response, next) {
    response.header('Access-Control-Allow-Origin', request.headers.origin);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    response.header("Access-Control-Allow-Credentials", true);
    if ( request.method == 'OPTIONS' ) {
      response.status(200).send();
    } else {
      next();
    }
  });

  app.disable('x-powered-by');
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser());
  app.use(queryType.middleware()); /* This will convert all string type to integer for query parameters */
}(app));

/* Database configuration */
/*
(function databaseConnection(app) {
  app.set('dbUrl', dbConfig.db[app.get('env')]);
  mongoose.Promise = global.Promise;
  mongoose.connect(app.get('dbUrl'));
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'database connection error:'));
  db.once('open', function() {
    console.log("we're connected with database!");
  });
}(app));
*/

/* Serve the HTML page on root */
app.get('/', function (request, response) {
  response.write("Hello World, I am Robo-G Version 1.0");
  response.end();
});

/* RESTFUL API */
app.use(pathURI, routes);

/* [Socket.io] */
io.on('connection', function(socket) {
  console.log('A user connected');

  // throwing to client
  socket.emit('connected', {
    greeting: "hello, you are connected with the server"
  });

  // listening to client on any movement
  socket.on('movement',  ({movement}) => {
    console.log("movement: ", movement);
    socket.broadcast.emit('movement', {movement});
  });

  // Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });

  //console.log("this is the socket.handshak: ",socket.handshake.query["name"]);

});

/* Starting the SERVER */
http.listen(3600, function() {
  console.log("Now server is running on port 3600!");
});



