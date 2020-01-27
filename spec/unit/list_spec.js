// tests for the List model
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("List", () => {
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
  		it("should create a list object with a title and category", (done) => {
  			List.create({
  				title: "Grocery list",
  				category: "GROCERIES",
  				userId: this.user.id
  			})
  			.then((list) => {
  				expect(list.title).toBe("Grocery list");
  				expect(list.category).toBe("GROCERIES");
  				expect(list.userId).toBe(this.user.id);
  				done();
  			})
  			.catch((err) => {
  				console.log(err);
  				done();
  			})
  		});

  		it("should create not a list object with a missing title or category", (done) => {
  			List.create({
  				title: "Shopping List",
  				userId: this.user.id
  			})
  			.then((list) => {

  				done();
  			})
  			.catch((err) => {
  				expect(err.message).toContain("List.category cannot be null");
  				done();
  			})
  		});
  	}); // end of #create()

});