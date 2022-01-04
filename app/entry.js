import $ from 'jquery';
const storyControl = require('./story-control');
const now = $('#now');
now.text(storyControl.getNowHM());


$(function() {

  $.each(storyControl.getStoryArray(), function(index, element) {
      $('.sample').append(index + ':' + element + '<br>');
  });

});
