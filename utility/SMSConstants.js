/**
 * Created by kaverma on 6/4/16.
 */

var SMS_CONSTANTS = (function() {

    var private = {
        'SEND_OTP_TEXT': 'Your Tendy-Mart OTP is ',
        'YOUR_SHOP_IS_DELETED_BY_ADMIN': ' have reported as abuse by most of people and we have deleted your shop',
        'TEXT_AFTER_SHOP_ADDED': ' is available to the world, Now you can share your shop URL to anyone. '
    };

    return {
        get: function(name) { return private[name]; }
    };

})();

module.exports = SMS_CONSTANTS;

