/**
 * Created by kaverma on 6/5/16.
 */

const PROPERTIES = (function() {

    const private = {
        'EMAIL_HOST': 'smtp.gmail.com',
        'ADMIN_EMAIL': 'tendymart@gmail.com',
        'ADMIN_PASS': '123qwe,./',

        'FRONT_END_URL' : 'https://www.tendymart.com/#/'
    };

    return {
        get: function(name) { return private[name]; }
    };

})();

module.exports = PROPERTIES;