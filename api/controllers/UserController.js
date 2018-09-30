/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req, res) {
        res.view();
    },

    create: function (req, res) {
        let elem = {
            username: req.param('username'),
            password: req.param('password'),
            admin: req.param('admin'),
        };

        User.create(elem).exec(function (err, user) {
            if(err) return res.send(500);
            req.session.auth = true;
            res.redirect('/');
        });
    },

    update: function (req, res) {
        let username = req.param('username');

        let elem = {
            username: req.param('username'),
            admin: req.param('admin'),
            updatedAt: Date.now(),
        };
    },

    delete: function (req, res) {
        let username = req.param('username');
        User.destroy(username).exec(function (err) {
            if(err) return res.send(500);
            res.redirect('/');
        })
    }

};

