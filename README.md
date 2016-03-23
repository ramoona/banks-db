# Banks DB
[![Build Status](https://img.shields.io/travis/ramoona/banks-db/master.svg?style=flat-square)](https://travis-ci.org/ramoona/banks-db)
[![Latest Stable Version](https://img.shields.io/npm/v/banks-db.svg?style=flat-square)](https://www.npmjs.com/package/banks-db)
[![NPM Downloads](https://img.shields.io/npm/dm/banks-db.svg?style=flat-square)](https://www.npmjs.com/package/banks-db)

Returns bank name and brand color by bankcard prefix (BIN).

It is useful on billing pages to use bank’s brand color when user starts to type card number.

<img alt='banks-db usage example' src="https://raw.githubusercontent.com/ramoona/banks-db-demo/master/demo-example.jpg" width="500px" />

It is a community driven database, so it can potentially contain mistakes. It's not a problem for UX enhancement,
but you must not use it in your billing logic.

## Demo
Try your card prefix in our [demo](https://ramoona.github.io/banks-db-demo/). Note that only first 6 digits of card number are required.

## Usage

### PostCSS

With [postcss-banks-db](https://github.com/ramoona/postcss-banks-db) and
[postcss-contrast](https://github.com/stephenway/postcss-contrast) you can
generate CSS for each bank:

```css
.billing-form {
    transition: background .6s, color .6s;
    background: #eee;
}
@banks-db-template {
    .billing-form.is-%code% {
        background-color: %color%;
        color: contrast(%color%);
    }
}
```

And then switch bank’s style in JS:

```js
import banksDB from 'banks-db';

const bank = banksDB(cardNumberField.value);
if ( bank.code ) {
  billingForm.className = 'billing-form is-' + (bank.code || 'other');
  bankName.innerText = bank.country === 'ru' ? bank.localTitle : bank.engTitle;
} else {
  billingForm.className = 'billing-form';
  bankName.innerText = '';
}
```

### CSS-in-JS

```js
import contrast from 'contrast';
import banksDB  from 'banks-db';

BillingForm  = ({ cardNumber }) => {
  const title, color;
  const bank = banksDB(this.props.cardNumber);
  if ( bank.code ) {
    title = bank.country === 'ru' ? bank.localTitle : bank.engTitle;
    color = bank.color;
  } else {
    title = '';
    color = '#eee';
  }
  return (
    <div style={{
      transition: 'background .6s, color .6s',
      background: color,
      color:      contrast(color) === 'light' ? 'black' : 'white'
    }}>
      <h2>{ title }</h2>
      …
    </div>
  );
}
```

### Other Best Practices
See also best practices for billing forms:

* [fast-luhn](https://github.com/bendrucker/fast-luhn) to check bank card number for mistakes
* [Halter font](http://www.dafont.com/halter.font) to simulate bank card font
* [convert-layout](https://github.com/ai/convert-layout) to force English keyboard in holder name field

## API

Library exports `banksDB` function. It accepts bankcard number and return
bank object.

```js
var banksDB = require('banks-db');
var bank    = banksDB('5275 9400 0000 0000');
console.log(bank.code) //=> 'ru-citibank'
console.log(bank.type) //=> 'mastercard'
```

If database doesn't contain this bank prefix, bank object will have only
`type` field.

```js
var unknown = banksDB('4111 1111 1111 1111');
console.log(bank.code) //=> undefined
console.log(bank.type) //=> 'visa'
```

You can get bank database by `banksDB.data`:

```js
for ( let bank of banksDB.data ) {
    console.log(bank);
}
```

### Bank Object

* `type`: bankcard type. For example, `'visa'` or `'mastercard'`.
  Banks DB will return it even if bank is unknown.
* `code`: unique bank code, contain country and name. For example, you can use it to generate CSS selectors for every bank.
* `color`: bank's brand color in HEX-format.
* `localTitle`: bank's title in local language.
* `engTitle`: international bank's title.
* `name`: short bank's name (not unique). For example, `'citibank'`.
* `country`: bank's operation country. For example, you can use it
  to display `localTitle` for local banks and `engTitle` for others.
* `url`: bank's website URL.

## Contributing

In case your bankcard doesn't work, please check if your bank already in [Banks DB](https://github.com/Ramoona/banks-db/tree/master/banks):

- If your bank is already included, you can [open an issue](https://github.com/Ramoona/banks-db/issues) with your prefix (NOT full number of your card, just first 5 or 6 symbols) or send a pull request.
- Otherwise you can add a new bank (see [contributing guide](https://github.com/Ramoona/banks-db/blob/master/CONTRIBUTING.md)).
 
## Changelog
See [CHANGELOG.md](https://github.com/ramoona/banks-db/blob/master/CHANGELOG.md) or [release notes](https://github.com/ramoona/banks-db/releases) (with commits history).
