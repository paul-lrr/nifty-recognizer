var socket = io.connect('', {transports: ['websocket']});
var override = document.getElementById('override');
var clearButton = document.getElementById('clear-button');

var holder = document.getElementById('holder'),
	tests = {
		filereader: typeof FileReader !== 'undefined'
	},
	acceptedTypes = {
		'image/png': true,
		'image/jpeg': true,
		'image/gif': true
	};

function drop(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	this.className = '';
	var imageUrl = false;

	var imageHtml = evt.dataTransfer.getData('text/html');
	var result = imageHtml.match(/src="(.*?)"/);

	if (result !== null && result.length > 0) {
		imageUrl = decodeEntities(result[1]);
	}

	if (imageUrl) {
		updateImage(imageUrl);
	} else {
		previewfile(evt.dataTransfer.files[0]);
	}
}

function updateImage(src) {
	override.disabled = false;
	pub(src);
}

function clearImage() {
	override.disabled = true;
	pub('clear');
}
function overrideStop() {
	override.disabled = true;
	pub('overrideStop');
}

function pub(message) {
	socket.emit('card_image', {
		'auto': false,
		'src': message
	});
}

function previewfile(file) {
	if (tests.filereader === true && acceptedTypes[file.type] === true) {
		var reader = new FileReader();

		reader.onload = function (event) {
			var image = new Image();
			image.src = event.target.result;
			updateImage(image.src);
		};

		reader.readAsDataURL(file);
	}
}

function preventEvent(evt) {
	evt.preventDefault();
}

window.addEventListener('dragover', preventEvent);
window.addEventListener('drop', preventEvent);

holder.addEventListener('dragover', function(evt) {
	evt.preventDefault();
	this.className = 'hover';
});
holder.addEventListener('dragleave', function(evt) {
	evt.preventDefault();
	this.className = '';
})
holder.addEventListener('drop', drop);

override.addEventListener('click', overrideStop);
clearButton.addEventListener('click', clearImage);

var decodeEntities = (function() {
	// this prevents any overhead from creating the object each time
	var element = document.createElement('div');

	function decodeHTMLEntities (str) {
		if (str && typeof str === 'string') {
			element.innerHTML = str;
			str = element.textContent;
			element.textContent = '';
		}

		return str;
	}

	return decodeHTMLEntities;
})();