"use strict";

let express = require("express");
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

app.use( express.static(__dirname + "/../client") );

app.get('/studentInfo', (request, response)=>{
  let students = mongoUtil.students();
  students.find().toArray( (err, docs) => {
     console.log(JSON.stringify(docs));
     response.json(docs);
  });
});
app.get('/studentInfo/:enrl_no', (request, response) =>{
    let StudentEnroll = request.params.enrl_no;
    let marks = mongoUtil.students();
    marks.find({enrl_no : StudentEnroll}).limit(1).next((err, doc) =>{
                  if(err){
                    response.sendStatus(400);
 }
         console.log("Student doc", doc);
            response.json(doc);
});
});
app.post('/studentInfo/:enrl_no/marks', jsonParser, (request, response) =>{
	let StudentEnroll = request.params.enrl_no;
    let students = mongoUtil.students();
    let newMarks = request.body.marks || {};
  let query = {enrl_no : StudentEnroll};
  let update = {$push: {marks: newMarks}};

  students.findOneAndUpdate(query, update, (err, res) => {
    if(err){
      response.sendStatus(400);
    }
    response.sendStatus(201);
  });
});
app.post('/studentInfo/new-student', jsonParser, (request, response) =>{
	let students = mongoUtil.students();
	let newStudent = request.body.student|| {};
        students.insert(newStudent, (err, doc) => {
            if(err){
              response.sendStatus(400);
             }
        response.sendStatus(201);
    });
});
app.listen(8181, () => console.log( "Listening on 8181" ));
