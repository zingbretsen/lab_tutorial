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
study = "demo/demographics"; //CHANGEME

// Make your new tasks
var myDemo = new demo();


// These are some pre-programmed demographic questions that you can include if you want
myDemo.info['age']['include']      = true; //CHANGEME (IF YOU WANT)
myDemo.info['mouse']['include']    = true; //CHANGEME (IF YOU WANT)
myDemo.info['gender']['include']   = true; //CHANGEME (IF YOU WANT)
myDemo.info['language']['include'] = true; //CHANGEME (IF YOU WANT)
myDemo.info['english']['include']  = true; //CHANGEME (IF YOU WANT)
myDemo.info['hispanic']['include'] = true; //CHANGEME (IF YOU WANT)
myDemo.info['race']['include']     = true; //CHANGEME (IF YOU WANT)

// Or you can add questions on the fly
// add = function (id, ques, type, choices/options, required)
myDemo.add('handedness', 'Which hand do you write with?', 'radio', [' Left', ' Right', ' Both'], true);
myDemo.add('icecream', 'Which is your favorite ice cream?', 'dropdown', ['Vanilla', 'Chocolate', 'Other'], true);
myDemo.add('shortanswer', 'Write a word', 'text', [], true);
myDemo.add('longanswer', 'Write a sentence', 'textarea', [], true);
myDemo.add('feel', 'How do you feel?', 'slider', {min: 0, max: 10, step: 1, labels: ['Awful', 'Meh', 'Faaaantastic']}, true);

myDemo.name = 'demo';

// Change the main splash screen instructions here:
var consentTitle = ['Demographics example']; //CHANGEME

var consentText = [
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Welcome to the experiment! Thank you for your participation.',
  'You will answer some questions about yourself', //CHANGEME
]; 

var consentBold = [ 
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Please DO NOT use your browser\'s back or reload buttons!'
];

// You can change how they display by altering the "type" below (e.g. h1/h2/h3/p, etc.)
// Writes text to splash page and adds a button to start the first task
postInstructions([
  wrap([consentTitle,'h3']),
  wrap([consentText,'p','.consent']), 
  wrap([consentBold,'h3','.instructions'])],
  myDemo,
  false); //hides instructions until preloaded


  window.onload = function () {

    donePreloading();
    $(function () {
      $('#progressbar').progressbar({value:0, max:60})
      .height('5px');
    });


  };
