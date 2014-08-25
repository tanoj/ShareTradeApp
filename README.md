# Share Trading Application

This is an exercise in learning key web technologies using a simple trading scenario. We will use the following technologies and frameworks to complete this exercise:
(The actual repo (backbone version) would be available at https://github.com/archfirst/trader-desktop)

* Node.js
* AngularJS
* jQuery
* Sass/Compass

The application consists of a Node.js based server that accepts orders for trading stocks and 'places' the orders in the market.

* The server may break a large order in to smaller chunks called 'placements' and push them to the market at different times.
* A large order may not get filled in one shot, it may require several 'executions' to fill (depending on the supply and demand).
* The server keeps the client informed about order progress by sending events over WebSockets.

# Requirements

The server part is fully coded. You only need to code the client part providing the following functionality:

* Allow the user to place orders.
* Display the progress of orders in a table that is updated in real time. Listen to WebSocket messages from the server to implement this. If you have the Trader Desktop open in multiple browsers, they should all show the same information.
* Bonus points: In addition to the table, implement a creative visualization to display the same information.

In order to help with debugging, also implement the following two functions:

* Allow the user to delete all orders on the server.
* Allow the user to "refresh" the desktop. This should drop all orders from the client and get a fresh copy from the server.

# Share Trading Application

## Getting Started

To get you started you can simply clone the trader-desktop-angular repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get it from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone trader-desktop-angular

Clone the angular-seed repository using [git][git]:



### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `client/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```
