
'use strict';
const storyJsons = require('../public/storys/routine.json');
const storyLimit = 24;
let oneDayStoryArray = new Array();
let ima = new Date();
/**
 * 動作確認のためストーリーを出力するモジュール
 * @return {string}
 */
function testStory(){
  return storyJsons.routine[0];
}

/**
 * 配列の中からランダムの要素を返す
 * @param {array}
 * @return {string}
 */
function getStory(arrayname) {
  let num = Math.floor(Math.random() * arrayname.length);
  return arrayname[num];
}

/**
 * ２４個の要素の配列にランダムな要素を入れる
 * 
 */
function getStoryArray() {
  for(let i = 0; i < storyLimit; i++) {
    oneDayStoryArray.push(getStory(storyJsons.routine));
  }
  return oneDayStoryArray;
}

function getNowHM() {
  return `現在は${ima.getHours()}時${ima.getMinutes()}分です`;
}





module.exports = {
  testStory,
  getStory,
  getStoryArray,
  getNowHM
}