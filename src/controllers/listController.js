const listQueries = require("../db/queries.lists.js");
const itemQueries = require("../db/queries.items.js");

module.exports = {
	index(req, res, next){
		listQueries.getAllLists((err, lists) => {
			if(err){
				console.log(err);
				res.redirect(500, "static/index");
			} else {
				res.render("lists/index", {lists});
			}
		})
	},
	create(req, res, next){
	    let newList = {
	        title: req.body.title,
	        category: req.body.category.toUpperCase(),
	        userId: req.user.id
	    };
	    listQueries.addList(newList, (err, list) => {
	        if(err){
                console.log(err);
	            res.redirect(500, '/');
	        } else {
	            res.redirect(303, `/lists/${list.id}`);
	        }
	    });
    },

    show(req, res, next){
        listQueries.getList(req.params.id, (err, result) => {
            list = result['list'];
            items = result['items'];
            if(err || list == null){
                res.redirect(404, '/');
            } else {
                res.render('lists/show', {list, items});
            }
        });
    },

    destroy(req, res, next){
        listQueries.deleteList(req.params.id, (err, deletedRecordsCount) => {
            if(err){
                res.redirect(500, `/lists/${req.params.id}`);
            } else {
                res.redirect(303,`/lists`); 
            }
        });
    },
    
    update(req, res, next){
        listQueries.updateList(req.params.id, req.body, (err, collection) => {
            if(err || collection == null){
                res.redirect(401, `/lists/${req.params.id}`);
            } else {
                res.redirect(`/lists/${req.params.id}`);
            }
        });
    }

}

