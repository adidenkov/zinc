#!/usr/bin/nodejs


// -------------- load packages -------------- //

const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');
const app = express();


// -------------- express initialization -------------- //

app.set('port', process.env.PORT || 8080 ); //port setup - number specific to this system
app.set('view engine', 'hbs');
app.set('trust proxy', 1);  //trust first proxy

// serve static folders
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

app.use(express.static(path.join(__dirname, 'shared')));


// -------------- global variables -------------- //
// Stored in RAM - RESET upon process resatrt

// TODO


// -------------- helper functions -------------- //
// Mainly called upon initial requests

// TODO


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch the pages

hbs.registerPartial("navBar", fs.readFileSync("navbar.hbs", 'utf8'));

// conditional if operator: https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional#answer-9405113
// simplification: https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value#answer-34252942
hbs.registerHelper('ifCond', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

app.get("/", function(req, res){
    res.render("map");
});

app.get("/work", function(req, res){
    res.render("work");
});

app.get("/employ", function(req, res){
    res.render("employ");
});

app.get("/profile", function(req, res){
    res.render("profile");
});

//AJAX endpoints
app.get("/ajax", function(req, res){
    var id = req.session.user_data.id;
});

app.get("/:page", function(req, res){
    var landingPage = req.params.page;
    console.log("Requested nonexistent page: " + landingPage);

    res.render("notfound", {requestedPage: landingPage});
});


// -------------- listener -------------- //
// The listener is what keeps node 'alive.'

var listener = app.listen(app.get('port'), function(){
    console.log("Express server started on port: " + listener.address().port);
});