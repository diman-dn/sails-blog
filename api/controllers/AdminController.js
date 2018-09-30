/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req, res) {
        Post.find()
            .sort('createdAt DESC')
            .exec(function (err, posts) {
                if(err) return res.send(500);
                res.view({
                    posts: posts,
                });
            });
    },

    edit: function (req, res) {
        let alias = req.param('alias');

        Post.findOne(alias).exec(function (err, post) {
            if(!post) return res.send(404);
            if(err) return res.send(500);
            res.view({
                post: post,
            });
        });
    }

};

