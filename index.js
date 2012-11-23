var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
	var channels = [];
	var handler = function(channel) {
		// rebroadcast data on an arbitrary channel
		return function(data) {
			socket.broadcast.emit(channel, data);
		};
	};
	var listen = function(channel) {
		socket.on(channel, handler(channel));	
	};
	socket.on('initiate', function (data) {
		// listen to a channel if not already
		if( channels.indexOf(data.channel) == -1 ) {
			listen(data.channel);
			channels.push(data.channel);
		}
	});
});