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

## test

```hash
npm install
npm test
```