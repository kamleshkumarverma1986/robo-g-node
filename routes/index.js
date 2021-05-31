/**
 * Created by kamlesh verma on 26/May/2021.
 */

const express = require('express');
const router = express.Router();

/* All controllers reference */
const userController = require('../app/components/user/controller');

/* MIDDLEWARE to use for all requests */
router.use((request, response, next) => {
    if(!request.cookies.authtoken) {
        console.log("You're not Logged in");
    } else {
        console.log("WOW , You're Logged in, go ahead you can access anything here !!!!");
    }
    next();
});

/* USER Subscribe */
router.route('/user/subscribe')
    .post((request, response) => {
        userController.subscribe(request)
            .then( success => {
                response.status(success.statusCode).send(success);
            }).catch( error => {
                console.log("this is the error ", error);
                response.status(error.statusCode).send();
            });
    });

/* Connect Robo-G */
router.route('/connect-robo-g')
    .get((request, response) => {
        userController.connectRoboG(request)
            .then( success => {
                response.status(success.statusCode).send(success);
            }).catch( error => {
                console.log("this is the error ", error);
                response.status(error.statusCode).send();
            });
    });

module.exports = router;
