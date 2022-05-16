/**
 * Created by kaverma on 6/3/16.
 */

const userService = {};

userService.connectRoboG = (requestBody) => {
    return new Promise( (resolve, reject) => {
        resolve([{name: "kamlesh", address: "sarjapure, bangalore"}]);
    });
}

module.exports = userService;
