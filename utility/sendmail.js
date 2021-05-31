/**
 * Created by kaverma on 6/4/16.
 */

var PROPERTIES = require('../config/properties');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

module.exports = nodemailer;

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: PROPERTIES.get('EMAIL_HOST'),
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: PROPERTIES.get('ADMIN_EMAIL'),
        pass: PROPERTIES.get('ADMIN_PASS')
    }
});

nodemailer.composeAndSendEmail = function(userObject, mailSubject, linkObject, templateType, mailContent, callback) {
    var templatePath = '/email-templates/'+templateType+'.html';
    var replacements = {
        username: userObject.name,
        hyperLink: linkObject.link,
        hyperLinkText: linkObject.text,
        content: mailContent,

        contact: userObject.contact,
        latitude: userObject.latitude,
        longitude: userObject.longitude
    };    

    readHTMLFile(path.join('public', templatePath), function(err, html) {
        var template = handlebars.compile(html);

        var htmlToSend = template(replacements);

        // setup email data with unicode symbols
        let mailOptions = {
            from: process.env.EMAIL_FROM || 'TendyMart <do-not-reply@gmail.com>', // sender address
            to: userObject.email, // list of receivers
            subject: mailSubject, // Subject line
            html: htmlToSend // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            callback(error, info);
        });
    });
};
