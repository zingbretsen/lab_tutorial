"use strict";
var subjID, mTurkID;

bootstrapify(true);

//Try to grab mTurkID from URL
try {
  mTurkID = $.url().param('mTurkID');
} catch (err) { }
//If there is no mTurkID in the URL, leave it blank
if (mTurkID == undefined) {
  mTurkID = '';
}

//suppress anything from being logged to console
//window.console.log = function () {}

//Assign random 7 digit id
subjID = getSubjID(7);

// Change at your discretion
study = "demo/lab_survey"; //CHANGEME

var software = ['Bash', 'Other shells (e.g., ZSH)', 'Python', 'mTurk/Qualtrics integration', 'mTurk scripting', 'Vim', 'This framework'];
// Make your new tasks
var softwareExperience = new voteMultipleObj(software);
var softwareDesire = new voteMultipleObj(software);
var myDemo = new demo();

// Enter your task instructions
softwareExperience.instructions = 'Please answer the following questions';
softwareDesire.instructions = 'Please answer the following questions';

softwareExperience.start = softwareExperience.startNoInstructions;

softwareExperience.picHeight = "0px";
softwareExperience.height = "100%";
softwareExperience.prompt = "How much EXPERIENCE do you have with each of these pieces of software/programming languages/constructs:";
softwareExperience.trialScale = ["What is that?","","","Meh","","","I'm a pro!"];
softwareExperience.picArray = [''];
softwareExperience.name = 'experience';

softwareDesire.picHeight = "0px";
softwareDesire.height = "100%";
softwareDesire.prompt = "How much would you LIKE TO LEARN about each of these pieces of software/programming languages/constructs:";
softwareDesire.trialScale = ["Nooooope","","","Meh","","","OMG SO MUCH!"];
softwareDesire.picArray = [''];
softwareDesire.name = 'desire';

softwareExperience.nextTask= function (){
  softwareDesire.startNoInstructions();
}

softwareDesire.nextTask= function (){
  myDemo.start();
}

// These are some pre-programmed demographic questions that you can include if you want
// This one checks to see if the participant used a mouse or a trackpad
myDemo.add('name', 'What is your name?', 'text', '', true);
myDemo.name = 'name';

preloadImages_new(softwareExperience.picArray, function () {});


// Change the main splash screen instructions here:
var consentTitle = ['Software experience questionnaire']; //CHANGEME

var consentText = [
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Welcome to the experiment! Thank you for your participation.',
  'You will be asked to respond to some questions about your experience with different pieces of software.', //CHANGEME
]; 

var consentBold = [ 
  // each separate block of text will be separated by newlines
  // add or remove blocks as desired
  'Please DO NOT use your browser\'s back or reload buttons!',
];

// You can change how they display by altering the "type" below (e.g. h1/h2/h3/p, etc.)
// Writes text to splash page and adds a button to start the first task
postInstructions(
  [
    wrap([consentTitle,'h3']),
    wrap([consentText,'p','.consent']), //You can tag things with a particular class
    wrap([consentBold,'h3','.instructions'])
  ],
  softwareExperience, //This is the task to run when they click the Agree button
  false); //hides instructions until preloaded if true


window.onload = function () {

    donePreloading();
    $(function () {
      $('#progressbar').progressbar({value:0, max:60})
      .height('5px');
    });
  };
