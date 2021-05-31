/**
 * Created by kaverma on 6/4/16.
 */

var CONSTANTS = (function() {

    var private = {
        'ACCOUNT_CREATED_SUCCESSFULLY': 'Congratulations , Your account is created successfully.',
        'UNPROCESSABLE_ENTITY': 'Problem occurred while processing your request.',
        'EMAIL_ALREADY_REGISTERED': 'Email Already Registered.',
        'USERNAME_ALREADY_TAKEN': 'Username Already Taken.',
        'INTERNAL_SERVER_ERROR': 'Internal Server Error.',
        'UNAUTHORIZED_USER': 'UnAuthorized User',
        'SUCCESS': 'Success',
        'EMAIL_NOT_FOUND': 'Email not registered.',
        'CHECK_MAIL_FOR_RESET_PASSWORD': 'Check your mail for reset your password.',
        'RESET_PASSWORD_MAIL_SUBJECT': 'Reset Your Password',
        'CLICK_FOR_RESET_PASSWORD': ' , Please click the below link for reset your password.'
    };

    return {
        get: function(name) { return private[name]; }
    };

})();

module.exports = CONSTANTS;
