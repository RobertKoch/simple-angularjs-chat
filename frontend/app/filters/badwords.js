Chat.App.filter('badword', function () {
    var replaceChars = function(word) {
        return new Array(word.length+1).join('*');
    };
  return function(text) {
    Chat.Config.badwords.forEach(function(bw) {
        text = text.replace(bw, replaceChars);
    });
    return text;
  };
});
