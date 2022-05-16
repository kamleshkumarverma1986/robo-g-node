/**
 * Created by kaverma on 6/3/16.
 */

const userService = require('./service');
const DTO = require('../../../utility/dto');
const CONSTANTS = require('../../../utility/constants');

const userController = {};

userController.connectRoboG = (request) => {
    return new Promise( (resolve, reject) => {
        userService.connectRoboG(request.body)
            .then((data) => {
                DTO.statusCode = 200;
                DTO.message = CONSTANTS.get('SUCCESS');
                DTO.object = data;
                return resolve(DTO);
            }).catch( (error) => {
                DTO.statusCode = error;
                DTO.message = null;
                DTO.object = null;
                return reject(DTO);
            });
    });
}

module.exports = userController;
