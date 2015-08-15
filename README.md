# ColorfulIt

Add colorful chars to element.

![sample](sample.png)

Inspired by the banner at <http://substack.net/>.

## install

With NPM:
```hash
npm install colorful-it
```

## usage

`Require` it:
```javascript
var ColorfulIt = require('colorful-it');
ColorfulIt(document.getElementById('colorfulCharsContainer'), 'Hello, world!');
```

Or use the global var:
```javascript
ColorfulIt(document.getElementById('colorfulCharsContainer'), 'Hello, world!');
```

Or use as jQuery plugin (if you import jQuery before):
```javascript
$('#colorfulCharsContainer').ColorfulIt('Hello, world!');
```

## api

- ColorfulIt(ele, str, options)

  options:
    * seed: seed colors used to colorful chars, like [[255,255,0],[0,255,255],...]
    * stepNum: insert colors between every two colors in seed to get the Colors to be used
    * interval: speed of the change of colors, in millisecond

- ColorfulIt.prototype

    * run() - after stoped, use it to restart changing color
    * stop() - stop changing color

## test

```hash
npm install
npm test
```