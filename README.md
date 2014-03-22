This is the static content for the SRL leaderboards.

##Info

* Git is used for source control
* Node.js (namely npm and grunt) is used for development and dev dependency management
* Bower is used for frontend dependency management

##Getting started

* Install [Git](http://git-scm.com/) and add it to your PATH or install the Github app [(Mac)](http://mac.github.com/) [(Windows)](http://windows.github.com/)
* Install [Node.js](http://nodejs.org/) and add it to your PATH
* Clone this repo locally and navigate to it in your console
* Install grunt-cli:
	- `npm install -g grunt-cli`
* Install the npm packages while in the base repo directory (only needs to be run once):
	- `npm install`
* Run the Grunt update task to install any missing or out-of-date npm or bower dependencies (run whenever they change):
	- `grunt update`