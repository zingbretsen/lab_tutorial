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
study = "demo/revcorr"; //CHANGEME

// Make your new tasks
var revCorr = new revCorr();
var myDemo = new demo();


// Enter your task instructions
revCorr.instructions       = 'In this task you will be categorizing faces as either having positive or negative expressions.<br><br>For each trial, there will be two labels at the top. When you click the start button at the bottom a picture of a face will appear, and you will have to categorize the expression as positive or negative by clicking one of the labels at the top.<br><br>The trials are timed, and it is important that you try to respond as quickly as you can while still being as accurate as possible.<br><br><br><br>Please enter FULLSCREEN mode in your browser by clicking on View > Enter Full Screen<br>or by pressing ctrl + shift + F (on most PCs) or cmd + shift + F (on most Macs)';

// These are our faces
var targets = [
  [
  'bc3_KDEFMaleMean_4_1_0.jpg', 'bc3_KDEFMaleMean_4_1_1.jpg',
],
[
  'bc3_KDEFMaleMean_4_2_0.jpg', 'bc3_KDEFMaleMean_4_2_1.jpg',
],
[
  'bc3_KDEFMaleMean_4_3_0.jpg', 'bc3_KDEFMaleMean_4_3_1.jpg',
],
[
  'bc3_KDEFMaleMean_4_4_0.jpg', 'bc3_KDEFMaleMean_4_4_1.jpg',
],
[
  'bc3_KDEFMaleMean_4_5_0.jpg', 'bc3_KDEFMaleMean_4_5_1.jpg',
]
];

targets.shuffle();

revCorr.prompt = "Which face looks more stereotypically black?";
revCorr.picHeight = "300px";
revCorr.trialScale = ["Could be better","","","Middling","","","Exceptional"];
revCorr.picArray = targets;

// After mousetracking task, start the demographics
revCorr.nextTask= function (){
  myDemo.start();
}

// These are some pre-programmed demographic questions that you can include if you want
// This one checks to see if the participant used a mouse or a trackpad
myDemo.add('haiku','Please write a haiku if you desire', 'textarea', '', false); //Not required
myDemo.name = 'haiku';

preloadImages_new(revCorr.picArray, function () {});


// Change the main splash screen instructions here:
var consentTitle = ['Study on Emotional Expressions']; //CHANGEME

var consentText = [
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Welcome to the experiment! Thank you for your participation.',
  'You will be asked to respond to some questions about peoples\' facial expressions.', //CHANGEME
  'This part of the task will take approximately 20 minutes to complete.'
]; 

var consentBold = [ 
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Please use an external mouse if you have one available, and not a trackpad/trackball.',
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
  revCorr, //This is the task to run when they click the Agree button
  false); //hides instructions until preloaded if true


window.onload = function () {

    donePreloading();
    $(function () {
      $('#progressbar').progressbar({value:0, max:60})
      .height('5px');
    });
  };
