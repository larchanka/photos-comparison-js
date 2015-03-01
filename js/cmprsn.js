(function() {
	var ComparePhotos = function ComparePhotos() {

		this.photosInformation = {};
		this.pressed = false;
		this.position = {
			x: 0,
			y: 0
		};
		this.size = {
			x: 0,
			y: 0
		};
		this.element;

		_self = this;

		this.init = function(element) {
			this.element = element || false;

			if(!this.element) {
				throw new Error('ComparePhotos: element does not pasted!');
				return;
			}

			if(typeof this.element === 'string') {
				this.element = document.querySelector(element);
			}

			this.wrap();
		}
	};

	ComparePhotos.prototype.wrap = function() {
		var photos = this.element.querySelectorAll('img'),
			i = 0,
			listElement = document.createElement('ul'),
			pointerElement = document.createElement('div'),
			titleElement = document.createElement('div'),
			photoElement;

		listElement.className = 'cmprsn-wrapper';
		pointerElement.className = 'cmprsn-pointer';
		titleElement.className = 'cmprsn-title';

		if(photos.length !== 2) {
			throw new Error('ComparePhotos: only 2 photos allowed!');
			return;
		}

		for(; i < photos.length; i += 1) {
			this.photosInformation[i] = {
				url: photos[i].getAttribute('src'),
				title: photos[i].getAttribute('alt')
			};
			photoElement = document.createElement('li');
			photoElement.className = "cmprsn-photo cmprsn-photo"+i;
			photoElement.innerHTML = '<img src="'
					+ this.photosInformation[i].url
					+ '" alt="'
					+ this.photosInformation[i].title
					+ '">';
			titleElement.innerText += this.photosInformation[i].title + ' (' + (i?'right':'left') + ') ';
			listElement.appendChild(photoElement);
			photoElement = null;
		}

		this.element.innerHTML = '';
		this.element.style.position = 'relative';
		this.element.appendChild(listElement);
		this.element.appendChild(pointerElement);
		this.element.appendChild(titleElement);
		listElement = null;
		titleElement = null;

		this.handleEvents();
	};

	ComparePhotos.prototype.handleEvents = function() {
		this.element.querySelector('.cmprsn-pointer').addEventListener('mousedown', this.setMove, false);

		this.element.querySelector('.cmprsn-wrapper').addEventListener('mousemove', this.getMove, false);

		this.element.querySelector('.cmprsn-pointer').addEventListener('mouseup', this.stopMove, false);
		this.element.querySelector('.cmprsn-wrapper').addEventListener('mouseup', this.stopMove, false);
	};

	ComparePhotos.prototype.setMove = function() {
		_self.pressed = true;
		_self.size = {
			x: _self.element.querySelector('.cmprsn-wrapper').offsetWidth,
			y: _self.element.querySelector('.cmprsn-wrapper').offsetHeight,
		};
	};

	ComparePhotos.prototype.getMove = function(e) {

		if(_self.pressed === true) {
			_self.position = {
				x: e.offsetX,
				y: e.offsetY,
			};

			var width = _self.size.x - _self.position.x;
			var percent = width / _self.size.x * 100;

			document.querySelector('.cmprsn-photo1').style.width = percent + '%';
			document.querySelector('.cmprsn-pointer').style.left = (100 - percent) + '%';
		}
	};

	ComparePhotos.prototype.stopMove = function() {
		_self.pressed = false;
	};

	window.ComparePhotos = new ComparePhotos;
})();