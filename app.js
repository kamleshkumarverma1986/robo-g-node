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
const cookieParser = require('cookie-parser');
const queryType = require('query-types');
const routes = require('./routes/index');

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

/* Serve the HTML page on root */
app.get('/', (request, response) => {
  response.write("Hello World, I am Robo-G Version 1.0");
  response.end();
});

/* RESTFUL API */
app.use(pathURI, routes);

/* All connected NodeMCU/clients with socket */
const allConnectedNodeMCU = {};
const allConnectedFeClient = {};

/* [Socket.io] */
io.on("connection", (socket) => {

  /* Register the NodeMCU */
  socket.on("REGISTER-ESP8266", ({macAddress}) => {
    allConnectedNodeMCU[macAddress] = {
      socketId: socket.id,
      isOccupy: false
    }
  });

  /* Register the Front-end Client */
  socket.on("REGISTER-FE-CLIENT", ({NodeMCU_MacAddress, callback}) => {
    if (!allConnectedNodeMCU[NodeMCU_MacAddress]) {
      callback({
        error: true,
        message: `Don't present any Robot-G associated with ${NodeMCU_MacAddress} MAC address. Please try again.`
      });
      return null;
    }
    if (allConnectedNodeMCU[NodeMCU_MacAddress] && allConnectedNodeMCU[NodeMCU_MacAddress].isOccupy) {
      callback({
        error: true,
        message: `The Robo-G already connected by someone`
      });
      return null;
    }
    const nodeMCU = allConnectedNodeMCU[NodeMCU_MacAddress];
    allConnectedFeClient[socket.id] = { associatedNodeMCU: nodeMCU }
    nodeMCU.isOccupy = true;
    callback({ error: false });
  });

  socket.on("movement",  ({movement}) => {
    console.log("movement: ", movement);
    const associatedNodeMCU = allConnectedFeClient[socket.id].associatedNodeMCU;
    if (associatedNodeMCU) {
      socket.to(associatedNodeMCU.socketId).emit("movement", socket.id, movement);
    }
  });

  socket.on('disconnect', () => {
    const associatedNodeMCU = allConnectedFeClient[socket.id].associatedNodeMCU;
    if (associatedNodeMCU) {
      associatedNodeMCU.isOccupy = false;
    }
    delete allConnectedFeClient[socket.id];
  });

});

/* Starting the SERVER */
http.listen(3600, () => {
  console.log("Now server is running on port 3600!");
});
