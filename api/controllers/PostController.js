/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    index: function (req, res) {
        Post.find()
            .sort('createdAt DESC')
            .limit(5)
            .exec(function (err, posts) {
                if(err) return res.sendStatus(500);
                res.view({
                    posts: posts,
                });
            });
    },

    view: function (req, res) {
        let alias = req.param('alias');
        Post.findOne(alias).exec(function (err, post) {
            if(err) return res.sendStatus(500);
            if(!post) return res.sendStatus(404);
            res.view({
                post: post,
            });
        });
    },

    page: function (req, res) {
        let page = req.param('page');

        Post.find()
            .sort('createdAt DESC')
            .paginate(page, 5)
            .exec(function (err, posts) {
                if(err) return res.sendStatus(500);
                res.view({
                    posts: posts,
                    page: page
                });
            });
    },

    create: function (req, res) {
        let params = {
            title: req.param('title'),
            description: req.param('description'),
            content: req.param('content'),
        };

        Post.create(params).exec(function (err, post) {
            if(err) return res.sendStatus(500);
            res.redirect('/post/view/' + post.alias);
        });
    },
    
    update: function (req, res) {
        let alias = req.param('alias');

        let elem = {
            title: req.param('title'),
            description: req.param('description'),
            content: req.param('content'),
            updatedAt: Date.now(),
        };

        Post.update(alias, elem).exec(function (err) {
            if(err) return res.sendStatus(500);
            res.redirect('/');
        });
    },
    
    delete: function (req, res) {
        let alias = req.param('alias');
        Post.destroy(alias).exec(function (err) {
            if(err) return res.sendStatus(500);
            res.redirect('/post');
        });
    }

};

