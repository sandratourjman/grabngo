# Grab n Go

Grab n Go is a web-application that allows users to create lists that can be shared in real-time with multiple people. 

### Assignment
Create a grocery list web-application that can be shared in real-time by multiple people.

Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way. Each person has the same grocery list on their phone. When one of you checks a grocery item off the shared list, it updates on everyone else’s list, preventing anyone from purchasing duplicate items. Similarly, items added to the list on any phone update to the same list.

### Minimum Requirements
1. Save, Update, and Delete items to/from a database of your choosing.
2. Authenticate users - allowing the same user to be signed in from multiple devices.
3. Allow add, edit, delete, "mark as purchased", and "unmark as purchased" on each item.
4. Keep the list synced in real time from each device.
5. Accompany your code with a full test suite.
6. Deploy your site to a web host (e.g., on Amazon EC2, Heroku, Netlify, Google AppEngine, etc.).

## Technical Decisions
I decided not to use something like Create React App to boostrap this project, as I wanted to create this project from scratch and control the way I structured my files and control of my UI. I knew I wanted to use Node, Express, EJS, and PostgreSQL off the bat. I've had roughly 3 months experiences with these technologies to date and wanted to use this opportunity to grow my skills. 

After developing the majority of my project, I needed to figure out a way to make it update in real-time, as any update I made required a refresh of the page. I didn't want to use something like Google Firebase since I was already saving data via PostgreSQL and there is no need to duplicate data in two spots. It would have been inefficient and I would have had to make sure that any update was happening in both places. During my research, I came across a technology called [Socket.io](https://socket.io/). "Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server". I was able to quickly add the package and add some code so that any time an item had a change, the page would update in real time. 

## How to get application running
You must have Node, npm, and Postgres installed in order to run this application locally.

##### Check that you have node and npm installed
To check if you have Node.js installed, run this command in your terminal:

```node -v```

To confirm that you have npm installed you can run this command in your terminal:

```npm -v```

If you don't have Node or npm, you can follow the [download guide on the official Node website](https://nodejs.org/en/download/).
##### Postgres
Postgres is a relational database management system that allows us to store objects of established data types such as integers, strings, and dates.

If you don't have Postgres installed, follow the [Postgres installation process](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04). If you set up a 'postgres' user, please use this where you see USERNAME in this guide.

1. Start the server with the following command:

``` pg_ctl -D /usr/local/var/postgres start ```
2. Create databases for our application:
```
createdb -U USERNAME -w grabngo-dev
createdb -U USERNAME -w grabngo-test
```
3. Within the following file, change the username to your USERNAME:
```
grabngo/db/config/config.json
```

So if you have a 'postgres' user, your file will look like this:
```
"username": "postgres",
```

4. Once you finish using the app, make sure to stop the server:

``` pg_ctl -D /usr/local/var/postgres stop ```

##### Cloning the Repository

Next, clone the repository. _(I would recommend creating a new folder on your machine so it  doesn't clone to your root directory)._

To clone the repo, run the following command:

``` git clone https://github.com/sandratourjman/grabngo.git ```

Then you have to change directories to your cloned repo:

``` cd grabngo```

To start the server to view the application, run ```npm start``` in your terminal and navigate your browser to ```http://localhost:3000/```

[Live version of application on Heroku](https://sandratourjman-grabngo.herokuapp.com/)

## How to run tests
To run the tests, first make sure your server is running. _(To check if a server is running you can run the following command in your terminal window):_

``` pg_ctl -D /usr/local/var/postgres status ```

Once running you can input ```npm test``` to run the Jasmine tests.

## Next Sprint Features

##### UI
1.  Fix width issues with input fields when viewing on a mobile device (which don't appear when using Chrome Dev Tools)
2.  On Heroku, Bootstrap's 'secondary' button classes are not showing color correctly
3.  If a user navigates to root page, fix message that navigates them to the /lists page.
4.  Allow item text to be clickable to allow item to be checked off
5.  Making the edit/delete buttons of an item appear on hover 

##### Functionality
1. Don't allow users to add emtpy items
2. Implement [SortableJS](https://github.com/SortableJS/Sortable) library so that a user can drag and drop items in a different order
3. Allow users to create private lists that can also allow them to share with others
4. Don't allow users to change item name to something blank
5. Add Socket.io for changes to lists (similar to item updates) 
6. Explore adding a Purchased list so when an item is checked off, it pops off the main list to a purchased list
7. Save “frequently purchased” items to a list of suggestions
8. Create User Groups, allowing individual users to be members of one or more different Grocery List groups.
9. Allow users to set a max budget for an item
10. Allow users to split payments based on grocery costs.
11. Add a coupon API to application to display available coupons for listed items.

##### Testing
1. Add more tests around users
2. Add more tests around lists
3. Add more tests around items
4. Items - dont allow users to add emtpy items to list

