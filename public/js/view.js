var socket = io.connect('', {transports: ['websocket']});
var display = document.getElementById('display');
var override = document.getElementById('display-override');

function update(disp, over) {
	if (disp) {
		display.src = disp;
		override.src = '';
	} else if (over) {
		override.src = over;
	}

	override.className = over ? '' : 'hide';
	display.className = (disp || !over) ? '' : 'hide';
}

socket.on('card_image', function(msg) {
	if (msg.src == 'clear') {
		update('http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card');
	} else if (msg.src == 'overrideStop') {
		update();
	} else if (msg.auto) {
		update(msg.src)
	} else {
		update(false, msg.src);
	}
});