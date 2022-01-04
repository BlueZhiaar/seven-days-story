/**
 * 配列の中からランダムの要素を返す
 * @param {array}
 * @return {string}
 */
 getStory()

 contents.text(storyControl.setStoryArray);
でテキストを格納できる
classは頭にドット

 $.each(storyControl.getStoryArray(), function(index, element) {
      $('.sample').append(index + ':' + element + '<br>');
  });
  で.sampleに要素を表示