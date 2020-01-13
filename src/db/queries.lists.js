const List = require("./models").List;

module.exports = {

	getAllLists(callback) {
		return List.all()

		.then((lists) => {
			callback(null, lists);
		})
		.catch((err) => {
			callback(err);
		})
	},

	getList(id, callback) {
		let result = {};
		return List.findByPk(id)
		.then((list) => {
			if(!list){
				callback(400);
			} else {
				result['list'] = list;
				// Item.scope({method: ['itemsFor', id]}).findAll()
				// .then(items => {
				// 	result['items'] = items;
				// 	callback(null, result)
				// })
				callback(null, result);
			}
		})
		.catch((err) => {
			callback(err);
		})
	},

	addList(newList, callback) {
		return List.create(newList)
		.then((list) => {
			callback(null, list)
		})
		.catch((err) => {
			callback(err);
		})
	},


	deleteList(id, callback) {
		return List.destroy({
			where: {id}
		})
		.then((deletedRecordsCount) => {
			callback(null, deletedRecordsCount)
		})
		.catch((err) => {
			callback(err);
		})
	},

	updateList(id, updatedList, callback) {
		return List.findByPk(id)
		.then((list) => {
			if(!list) {
				return callback("List not found");
			}

			list.update(updatedList, {
				fields: Object.keys(updatedList)
			})
			.then(() => {
				callback(null, list);
			})
			.catch((err) => {
				callback(err);
			})
		})
	}
}