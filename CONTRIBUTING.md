# Adding a new bank

1. Fork the [Banks DB](https://github.com/Ramoona/banks-db) repository and then clone your fork.
2. `npm install` from your fork's root directory.
3. (_Optional_) ensure `npm test` is passing before making changes.
4. Create new JSON file in `banks/%country%` folder and call it same as your bank `name` (lowercase). In case your country folder isn't exist yet, just add it. Make sure that your bank `country` matches with name of folder where you put it.
5. Fill your JSON with this guide:

  * `name`: bank codename in lowercase (same as your file name)
  * `country`: two letters code of bank country ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2))
  * `localTitle`: bank title in local language
  * `engTitle`: bank title in English
  * `url`: link to official bank website
  * `color`: bank brand color from official logo or website (HEX, lowercase)
  * `defunct` : set `true` for banks with revoked license (optional)
  * `prefixes`: array of bank prefixes (each prefix must contain 5 or 6 digits)

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
6. Make sure that `npm test` is still passing.
7. Submit a pull request.

### Notice

Don't create or modify index.js files in banks folders manually — they are generated. You can run `npm run build` to update them.
