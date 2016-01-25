# Adding a new bank

1. Fork the [Banks DB](https://github.com/Ramoona/banks-db) repository and then clone your fork.
2. Create new JSON file in `banks` folder and name it same as your bank title (lowercase).
3. Fill your JSON with this guide:

  * Required:
      * `name`: bank codename in lowercase (same as your file name)
      * `prefixes`: array of bank prefixes (each prefix must contain 5 or 6 digits)
      * `country`: two letters code of bank country ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2))
      * `localTitle`: bank title in local language
      * `engTitle`: bank title in English
      * `url`: link to official bank website
      * `color`: bank brand color from official logo or website
    
  * Optional  
    * `defunct` : set `true` for banks with revoked license

  Here's an example:

  ```js
    {
      "name": "mybank",
      "prefixes": [
        12345,
        123456,
      ],
      "country": "ru",
      "localTitle": "Мой банк",
      "engTitle": "My Bank",
      "url": "https://my-bank.com/",
      "color": "#000"
    }
    ```
4. Make sure `npm test` is still green
5. Submit a pull request.
