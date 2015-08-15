(function (factory) {

	var ColorfulIt;

	if (typeof exports === 'object' && typeof module === 'object') {
		ColorfulIt = module.exports = factory();
	} else {
		ColorfulIt = window.ColorfulIt = factory();
	}

	// register as jQuery plugin
	if (typeof jQuery === 'function' && jQuery.fn) {
		var $ = jQuery;
		$.fn.ColorfulIt = function (str, options) {
			this.each(function (i, ele) {
				new ColorfulIt(ele, str, options);
			});
		};
	}

})(function () {

	var DEFAULT_SEED = [
		[  0, 255, 255], // cyan
		[255,   0, 255], // magenta
		[255, 165,   0], // orange
		[  0, 255,   0]  // lime
	];

	function getDefaultConfig(ele, str) {
		return {
			ele: ele,
			str: str,
			seed: DEFAULT_SEED,
			stepNum: 10,
			interval: 50
		};
	}

	function getColors(seed, stepNum) {
		var colors = [];
		var fromColor, toColor, rStep, gStep, bStep;
		var rStart, gStart, bStart;
		var rEnd, gEnd, bEnd;

		for (var i = 0, j, len = seed.length; i < len; i++) {

			fromColor = seed[i];
			rStart = fromColor[0];
			gStart = fromColor[1];
			bStart = fromColor[2];

			toColor = seed[(i + 1) % len];
			rEnd = toColor[0];
			gEnd = toColor[1];
			bEnd = toColor[2];

			rStep = Math.floor((rEnd - rStart) / stepNum);
			gStep = Math.floor((gEnd - gStart) / stepNum);
			bStep = Math.floor((bEnd - bStart) / stepNum);

			for (j = 0; j < stepNum; j++) {
				colors.push('rgb(' + 
					(rStart + j * rStep) + ',' +
					(gStart + j * gStep) + ',' +
					(bStart + j * bStep) + 
				')');
			}
		}

		return colors;
	}

	function splitStringIntoElementContent(element, str) {
		var charElements = [];
		// clear element's current content.
		element.innerHTML = '';
		for (var i = 0, span, len = str.length; i < len; i++) {
			span = document.createElement('span');
			span.innerHTML = str[i];
			element.appendChild(span);
			charElements.push(span);
		}
		return charElements;
	}

	function runAnimation(eles, colors, interval) {
		var offset = 0;
		return setInterval(function () {
			for (var i = 0, len = eles.length, colorLen = colors.length; i < len; i++) {
				eles[i].style.color = colors[(len - i + offset) % colorLen];
			}
			offset = (offset + 1) % colorLen;
		}, interval);
	}

	/*
	 * @param {HTMLElement} ele
	 * @param {String} str
	 * @param {Object} [options]
	 * @constructor
	 */
	function ColorfulIt(ele, str, options) {
		if (!(this instanceof ColorfulIt)) {
			return new ColorfulIt(ele, str, options);
		}
		// todo add some param check here?
		this._options = getDefaultConfig(ele, str);
		this.config(options).reset().run();
	}

	// A stupid `extend` ^_^
	ColorfulIt.prototype.config = function (options) {
		var opts = this._options;
		if (options && typeof options === 'object') {
			// {HTMLElement} ele
			if (options.ele) {
				opts.ele = options.ele;
			}
			// {String} str
			if (options.str) {
				opts.str = options.str;
			}
			// {number[][3]} seed 
			if (options.seed) {
				opts.seed = options.seed;
			}
			// {number} stepNum
			if (options.stepNum) {
				opts.stepNum = options.stepNum;
			}
			// {number} interval
			if (options.interval) {
				opts.interval = options.interval;
			}
		}
		return this;
	};

	ColorfulIt.prototype.reset = function () {
		this._colors = getColors(this._options.seed, this._options.stepNum);
		this._charElements = splitStringIntoElementContent(this._options.ele, this._options.str);
		return this;
	};

	ColorfulIt.prototype.run = function () {
		if (this._timer) clearInterval(this._timer);
		this._timer = runAnimation(this._charElements, this._colors, this._options.interval);
		return this;
	};

	ColorfulIt.prototype.stop = function () {
		clearInterval(this._timer);
		return this;
	}

	return ColorfulIt;
});