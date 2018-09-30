/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let passwordHash = require('password-hash');

module.exports = {

    index: function (req, res) {
        res.view();
    },

    create: function (req, res) {
        let username = req.param('username');
        let password = req.param('password');

        if(!username || !password) {
            return res.redirect('/session');
        }

        User.findOneByUsername(username).exec(function (err, user) {
            if(!user || err) return res.send(500);
            if(passwordHash.verify(password, user.encryptPassword)) {
                req.session.auth = true;
                req.session.User = user;

                if(req.session.User.admin) {
                    return res.redirect('/admin');
                }
            }
        });
    },

    destroy: function (req, res) {
        User.findOne(req.session.User._id).exec(function (err, user) {
            if(err) return res.send(500);
            if(user) {
                req.session.destroy();
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        });
    }

};

