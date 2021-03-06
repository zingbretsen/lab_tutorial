"use strict";
var subjID, mTurkID;

//Try to grab mTurkID from URL
try {
  mTurkID = $.url().param('mTurkID');
} catch (err) { }
//If there is no mTurkID in the URL, leave it blank
if (mTurkID == undefined) {
  mTurkID = '';
}

//suppress anything from being logged to console
window.console.log = function () {}

//Assign random 7 digit id
subjID = getSubjID(7);

// Change at your discretion
study = "demo/morph"; //CHANGEME

// Make your new tasks
var voteTask = new scrollbarObj();
var myDemo = new demo();


// Enter your task instructions
voteTask.instructions       = 'Find your Point of Subjective Equality (PSE). Use the slider bar to select the face that looks like it has an equal mix of stereotypically black and stereotypically white features.';

// These are our faces
var targets = [ ['B2W2_0.jpg', 'B2W2_1.jpg', 'B2W2_2.jpg', 'B2W2_3.jpg', 'B2W2_4.jpg', 'B2W2_5.jpg', 'B2W2_6.jpg', 'B2W2_7.jpg', 'B2W2_8.jpg', 'B2W2_9.jpg', 'B2W2_10.jpg'] ];

voteTask.prompt = "At what point does this face look exactly between White and Black?";
voteTask.picHeight = "300px";
voteTask.trialScale = ["Could be better","","","Middling","","","Exceptional"];
voteTask.picArray = targets;

// After mousetracking task, start the demographics
voteTask.nextTask= function (){
  myDemo.start();
}

// These are some pre-programmed demographic questions that you can include if you want
// This one checks to see if the participant used a mouse or a trackpad
myDemo.info['age']['include']    = true; //CHANGEME (IF YOU WANT)
myDemo.name = 'age_check';

preloadImages_new(voteTask.picArray, function () {});


// Change the main splash screen instructions here:
var consentTitle = ['PSE slider']; //CHANGEME

var consentText = [
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Welcome to the experiment! Thank you for your participation.',
]; 

var consentBold = [ 
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Please DO NOT use your browser\'s back or reload buttons!',
  'You will receive the code for Qualtrics  at the end of the task.'
];

// You can change how they display by altering the "type" below (e.g. h1/h2/h3/p, etc.)
// Writes text to splash page and adds a button to start the first task
postInstructions(
  [
    wrap([consentTitle,'h3']),
    wrap([consentText,'p','.consent']), //You can tag things with a particular class
    wrap([consentBold,'h3','.instructions'])
  ],
  voteTask, //This is the task to run when they click the Agree button
  false); //hides instructions until preloaded if true


window.onload = function () {

    donePreloading();
    $(function () {
      $('#progressbar').progressbar({value:0, max:60})
      .height('5px');
    });
  };
