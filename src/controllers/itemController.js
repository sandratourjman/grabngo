const itemQueries = require("../db/queries.items.js");

module.exports = {
	index(req, res, next){
		itemQueries.getAllItems((err, result) => {
			if(err){
				console.log(err);
				res.redirect(500, "static/index");
			} else {
                items = result['items'];
				res.render(`items/index`, {items});
			}
		})
	},

    create(req, res, next){
	    let newItem = {
	        title: req.body.title,
            purchased: req.body.purchased,
	        userId: req.user.id,
            listId: req.params.listId
	    };
	    itemQueries.addItem(newItem, (err, item) => {
	        if(err){
	            res.redirect(500, `/lists/${item.listId}`);
	        } else {
	            res.redirect(303, `/lists/${item.listId}`);
	        }
	    });
    },
    show(req, res, next){
        itemQueries.getItem(req.params.id, (err, result) => {
            item = result['item'];
            list = result['list'];

            if(err || item == null){
                res.redirect(404, '/');
            } else {
                res.render(`items/show`, {item,list});
            }
        });
    },
    destroy(req, res, next){
        itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
            if(err){
                res.redirect(500, `/lists/${item.listId}`);
            } else {
                res.redirect(303,`/lists/${item.listId}`); 
            }
        });
    },
    // edit(req, res, next){
    //     itemQueries.getItem(req.params.id, (err, result) => {
    //         item = result['item'];
    //         list = result['list'];

    //         if(err || item == null){
    //             res.redirect(404, "/");
    //         } else {
				// res.render(`items/edit`, {item,list});
    //         }
    //     });
    // },
    update(req, res, next){
        itemQueries.updateItem(req.params.id, req.body, (err, item) => {
            if(err || item == null){
                res.redirect(401, `/lists/${item.listId}`);
            } else {
                res.redirect(`/lists/${item.listId}`);
            }
        });
    }
}