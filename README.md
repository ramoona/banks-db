# Banks DB 
[![Build Status](https://img.shields.io/travis/Ramoona/banks-db/master.svg?style=flat-square)](https://travis-ci.org/Ramoona/banks-db)
[![Dependency Status](https://img.shields.io/david/Ramoona/banks-db.svg?style=flat-square)](https://david-dm.org/Ramoona/banks-db)
[![Latest Stable Version](https://img.shields.io/npm/v/banks-db.svg?style=flat-square)](https://www.npmjs.com/package/banks-db)
[![NPM Downloads](https://img.shields.io/npm/dm/banks-db.svg?style=flat-square)](https://www.npmjs.com/package/banks-db)

Returns bank name and brand color by bankcard prefix (BIN).

It is useful on billing pages to use bank’s brand color when user starts to type card number.

![banks-db usage example](https://cloud.githubusercontent.com/assets/7067080/12102184/68851c68-b339-11e5-91c1-6a71797ada87.png)

It is a community driven database, so it can potentially contain mistakes. It's not a problem for UX enhancement,
but you must not use it in your billing logic.

## Contributing

In case your bankcard doesn't work, please check if your bank already in [Banks DB](https://github.com/Ramoona/banks-db/tree/master/banks):

- If your bank is already included, you can [open an issue](https://github.com/Ramoona/banks-db/issues) with your prefix (NOT full number of your card, just first 5 or 6 symbols) or send a pull request.
- Otherwise you can add a new bank (see [contributing guide](https://github.com/Ramoona/banks-db/blob/master/CONTRIBUTING.md)).

## Other Best Practices
See also best practices for billing forms:

* [fast-luhn](https://github.com/bendrucker/fast-luhn) to check bank card number for mistakes
* [Halter font](http://www.dafont.com/halter.font) to simulate bank card font
* [convert-layout](https://github.com/ai/convert-layout) to force English keyboard in holder name field
