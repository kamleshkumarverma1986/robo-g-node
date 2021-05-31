/**
 * Created by kaverma on 6/3/16.
 */

const User = require('./model');
const userService = {};

userService.subscribe = (requestBody) => {
    return new Promise( (resolve, reject) => {
        if (!requestBody.name || !requestBody.pincode || !requestBody.contact || !requestBody.email) {
            return reject(422);
        }
        User.findOne({email: requestBody.email}, (error, userObj) => {
            if(userObj) {
                return reject(409);
            }
            const user = new User();
            user.created = new Date();
            user.name = requestBody.name;
            user.pincode = requestBody.pincode;
            user.contact = requestBody.contact;
            user.email = requestBody.email;
            user.save( error => {
                if (error) {
                    console.log(`Error while saving user subscription :- ${error}`);
                    return reject(422);
                } else {
                    resolve(200);
                }
            });
        });

    });
}

userService.connectRoboG = (requestBody) => {
    return new Promise( (resolve, reject) => {
        resolve([{name: "kamlesh", address: "sarjapure, bangalore"}]);
    });
}

module.exports = userService;
