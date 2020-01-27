// tests for the Item model
const sequelize = require("../../src/db/models/index").sequelize;
const Item = require("../../src/db/models").Item;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;

describe("Item", () => {
	beforeEach((done) => {
	  	this.list;
	  	this.item;
	  	this.user;

	    sequelize.sync({force: true}).then((res) => {
	    	User.create({
	    		email: "potterfan@hogwarts.com",
	    		password: "Gryffindor7"
	    	})
	    	.then((user) => {
	    		this.user = user; // store the user

	    		List.create({
	    			title: "Grocery List",
	    			category: "GROCERIES",
	    			userId: this.user.id,

	    			items: [{
	    				title: "bread",
	    				purchased: false,
	    			}]
	    		}, {
	    			include: {
	    				model: Item,
	    				as: "items"
	    			}
	    		})
	    		.then((list) => {
	    			this.list = list; // store the list
	    			this.item = list.items[0]; // store the item
	    			done();
	    		})
	    	})
	    })
	    .catch((err) => {
	      console.log(err);
	      done();
	    });
  	});

  	 describe("#create()", () => {
  		it("should create a item object with a title and purchased value", (done) => {
  			Item.create({
  				title: "bread",
  				purchased: false,
  				listId: this.list.id
  			})
  			.then((item) => {
  				expect(item.title).toBe("bread");
  				expect(item.purchased).toBe(false);
  				expect(item.listId).toBe(this.list.id);
  				done();
  			})
  			.catch((err) => {
  				console.log(err);
  				done();
  			})
  		});

  		it("should create not a item object with a missing title or purchased value", (done) => {
  			Item.create({
  				purchased: false,
  				listId: this.list.id
  			})
  			.then((item) => {

  				done();
  			})
  			.catch((err) => {
  				expect(err.message).toContain("Item.title cannot be null");
  				done();
  			})
  		});
  	}); // end of #create()
});