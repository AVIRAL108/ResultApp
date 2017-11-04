# MEAN Stack
requirements for running Result Application

* MongoDB
* Express
* Angular
* Node

*Requires MongoDB server running*
* `sudo service mongod start`

## Developing

* `npm install` to resolve dependencies
* Seed database: `mongoimport --db students --collection studentinfo --type json --file server/StudentInfo.json --jsonArray --drop`
## Running App
*  ` node server/app.js`
