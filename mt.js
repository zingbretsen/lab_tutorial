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
study = "demo/mt"; //CHANGEME

// Make your new tasks
var mtTask = new MT();
var myDemo = new demo();


// There are lots of options you can set
// These are the defaults

//mtTask.name                  = 'MT';
//mtTask.timeout               = 0;
//mtTask.width                 = 800;
//mtTask.height                = 600;
//mtTask.followUpQuestions     = false;
//mtTask.saveFile              = "saveFile.php";
//mtTask.saveDemoFile          = "saveDemo.php";
//mtTask.backgroundColor       = 'black';
//mtTask.mousethresholdtimecut = 500;
//mtTask.timeout               = 0;
//mtTask.startloc              = [-0.1,0.2,0.1,0.1];
//mtTask.stimloc               = [0,0.5];
//mtTask.stimhcenter           = 1;
//mtTask.stimvcenter           = 1;
//mtTask.resploc               = [[-1,0.3,1.5,0.2],[.7,0.3,1.5,0.2]];
//mtTask.respbackcolor         = [0,0,0];
//mtTask.respfontcolor         = [255,255,255];
//mtTask.respfontsize          = 22;
//mtTask.respborder            = 1;
//mtTask.screencolor           = [175,175,175];
//mtTask.stimfontcolor         = [0,0,0];
//mtTask.stimfontsize          = 28;
//mtTask.startfontsize         = 18;
//mtTask.starttext             = "START";
//mtTask.ITI1                  = 1000;
//mtTask.ITI2                  = 1000;
//mtTask.respshowafter         = 0;
//mtTask.respshowafterdelay    = 0;
//mtTask.feedbacktime          = 0;
//mtTask.hovermode             = 0;
//mtTask.hovervspace           = 0.1;
//mtTask.hoverhspace           = 0.1;
//mtTask.timecut               = 0;
//mtTask.timecutmsg            = "TIME OUT!";
//mtTask.timeouttime           = 2000;
//mtTask.initcut               = 0;
//mtTask.initcutmsg            = "Please start moving earlier on even if you are not fully certain of a response yet!";
//mtTask.stimHeight            = '100%';
//mtTask.stimTop               = '';
//mtTask.borderColor           = 'rgb(175,175,175)';

// Here, we only change the stimHeight so the pictures fit on the screen
mtTask.stimHeight         = '300px';

// Enter your task instructions
mtTask.instructions       = 'In this task you will be categorizing faces as either having positive or negative expressions.<br><br>For each trial, there will be two labels at the top. When you click the start button at the bottom a picture of a face will appear, and you will have to categorize the expression as positive or negative by clicking one of the labels at the top.<br><br>The trials are timed, and it is important that you try to respond as quickly as you can while still being as accurate as possible.<br><br><br><br>Please enter FULLSCREEN mode in your browser by clicking on View > Enter Full Screen<br>or by pressing ctrl + shift + F (on most PCs) or cmd + shift + F (on most Macs)';

// Set up your mousetracking trials
// type|stim|cond|rand|correct|default-compare|resp_1|resp_2
mtTask.stimArray = [
  [0,"<p>For example: if you see a smiling face, likely you would say this is expressing a POSITIVE emotion.<br><br>If you see a frowning face likely you will say this is expressing a NEGATIVE emotion.</p>","instruct",,,,"",""],
  [0,"<p>Please remember to respond as QUICKLY as you can while also being ACCURATE.</p>","instruct",,,,"",""],
];

// These are our faces
var targets = ['008_y_m_h_a_tsblue.jpg', '182_y_f_h_a_tsblue.jpg', '008_y_m_f_a_tsblue.jpg', '182_y_f_f_a_tsblue.jpg', ];
targets.shuffle();

// We'll repeat all faces twice
var repetitions = 2;
// type|stim|cond|rand|correct|default-compare|resp_1|resp_2
var template_trial = [1,'','','','','','',''];
var num_targets = targets.length;

// Here we just build all of our MT trials
// We could create this ahead of time (e.g., in Excel)
for (var rep = 0; rep < repetitions; rep++) {
  var current_block = [];
  for (var i = 0; i < targets.length; i++) {
    var rand = rep + 1;
    var group = '';
    var target = targets[i];
    var temp_template = template_trial.slice();
    var cond = target.split('_')[3]; // Extract gender of target

    // 0    | 1    | 2    | 3    | 4       | 5               | 6      | 7      
    // type | stim | cond | rand | correct | default-compare | resp_1 | resp_2
    temp_template[1] = target;
    temp_template[2] = cond;
    temp_template[3] = rep;
    temp_template[4] = cond == 'f' ? 1 : 2; 
    temp_template[5] = (temp_template[4] % 2) + 1; // The other resp
    temp_template[6] = 'Negative';
    temp_template[7] = 'Positive';
    current_block.push.apply(current_block, [ temp_template.splice(0) ]);
  } 

  current_block.shuffle();
  mtTask.stimArray.push.apply(mtTask.stimArray, current_block);
  if (rep < repetitions - 1 ) {
    mtTask.stimArray.push.apply(mtTask.stimArray, [[ 0,'<h3>You may now take a short break.</h3>','instruct',0,,,, ]]);
  }
}

// After mousetracking task, start the demographics
mtTask.nextTask= function (){
  myDemo.start();
}

// These are some pre-programmed demographic questions that you can include if you want
// This one checks to see if the participant used a mouse or a trackpad
myDemo.info['mouse']['include']    = true; //CHANGEME (IF YOU WANT)
myDemo.name = 'mouse_check';

preloadImages_new(mtTask.stimArray, function () {});


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
  mtTask, //This is the task to run when they click the Agree button
  false); //hides instructions until preloaded if true


window.onload = function () {

    donePreloading();
    $(function () {
      $('#progressbar').progressbar({value:0, max:60})
      .height('5px');
    });
  };
