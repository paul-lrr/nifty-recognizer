var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));

server.listen(80, function () {
	console.log('Nifty server running on port 80!');
});

io.set('transports', ['websocket']);

io.on('connection', function (socket) {
	app.get('/cardmatch/:id', function (req, res) {
		var parsedId = parseInt(req.params.id, 10);
		var id = isNaN(parsedId) ? false : parsedId;

		if (id) {
			socket.broadcast.emit('card_image', {
				'auto': true,
				'src': 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + id + '&type=card'
			});
		}

		res.json({
			'displaying': id
		});
	});

	socket.on('card_image', function(msg) {
		socket.broadcast.emit('card_image', msg);
	});
});
