'use strict';
const jsonData = require('./public/storys/routine.json');
const storyControl = require('./public/javascripts/story-control.js');

console.log(storyControl.getStory(jsonData.routine));