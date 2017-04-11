# Adding a new bank

We use `yarn` as a package manager. Feel free to use `npm` instead if you don't have `yarn` installed. Npm commands are almost the same:
`yarn` = `npm i`
`yarn test` = `npm test`
`yarn build` = `npm run build`

1. Fork [Banks DB](https://github.com/Ramoona/banks-db) repository and then clone your fork.
2. `yarn` from your fork's root directory.
3. (_Optional_) ensure `yarn test` is passing before making changes.
4. Create new JSON file in `banks/%country%` folder and call it same as your bank's `name` (lowercase). In case your country folder doesn't exist yet, just add it. Make sure that your bank's `country` matches with the name of the folder where you put it.
5. Fill your JSON with this guide:

  * `name`: bank's codename in lowercase (same as your file name)
  * `country`: two letters code of bank's country ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2))
  * `localTitle`: bank's title in local language
  * `engTitle`: bank's title in English
  * `url`: link to official bank's website
  * `color`: bank's brand color from official logo or website (HEX, lowercase)
  * `defunct` : set `true` for banks with revoked license (optional)
  * `prefixes`: array of bank's prefixes (each prefix must contain 5 or 6 digits)

  All attributes except `defunct` are REQUIRED.

  Here's an example:

  ```js
  // banks/my-country/my-bank.json
    {
      "name": "my-bank",
      "country": "ru",
      "localTitle": "Мой банк",
      "engTitle": "My Bank",
      "url": "https://my-bank.com/",
      "color": "#000",
      "prefixes": [
        12345,
        123456,
      ]
    }
    ```
6. Make sure that `yarn test` is still passing.
7. Submit a pull request.

### Notice

Don't create or modify `index.js` files in banks folders manually — they are generated. Run `yarn build` to regenerate them.
