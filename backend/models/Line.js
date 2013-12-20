// the line model
var Line = function(text, user) {
	this.text = text;
	this.user = user;
  this.timestamp = new Date().getTime();
};

module.exports = Line;
