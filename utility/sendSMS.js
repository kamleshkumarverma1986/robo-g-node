/**
 * Created by kaverma on 6/4/16.
 */

var MSG91 = require('../config/msg91');

var SMS = {};

SMS.sendSMS = function(mobileNumber, msg, callback) {
    var msg91 = require("msg91")(MSG91.get("AUTH_KEY"), MSG91.get("SENDER_ID"), MSG91.get("ROUTE_NO"));
    msg91.send(mobileNumber, msg, function(error, response) {
        callback(error, response);
    });
}

SMS.getTransactionalMessageRemainingBalance = function(callback) {
    var msg91 = require("msg91")(MSG91.get("AUTH_KEY"), MSG91.get("SENDER_ID"), MSG91.get("ROUTE_NO"));
    msg91.getBalance(MSG91.get("ROUTE_NO"), function(err, msgCount){
    	callback(err, msgCount);              
    });
}

module.exports = SMS;


