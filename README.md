# Card Info

Live App - [https://release.d2yz97vh72k9e7.amplifyapp.com/]
<br/>
GitHub Link - [https://github.com/apurvathakker9/add-card-flexmoney]

## Introduction
The web application is designed to collect card (Debit/Credit) details from users who visit the app. Users are required to provide the following information:
- Card Holder's Name
- Card Number
- Expiry Month
- Expiry Year
- CVV

Once the user submits the information, it is sent to an API for processing. The API then responds with a success or failure status to indicate the outcome of the request. Based on the response received, the application displays a corresponding message to the user.

## Framework for the app
The app is built using Preact, a lightweight JavaScript library for frontend applications. The project was created using preact-cli, which provides a streamlined development environment for Preact projects. TypeScript is used as the programming language for developing the project, adding type safety and enhanced tooling support.


## Reason for choosing Preact
- Lightweight: Preact is a lightweight JavaScript library with a smaller bundle size, leading to faster loading times and improved performance.
- Familiarity with React: Preact shares a similar API with React, allowing developers familiar with React to seamlessly transition and leverage existing knowledge.
- Close to the DOM: Preact closely aligns with the browser's native DOM APIs, minimizing overhead and enhancing performance.
- Browser Compatibility: Preact works well in a wide range of browsers, including older versions, ensuring broad compatibility.
- Performance: Preact's efficient rendering algorithm and lightweight nature deliver excellent performance by selectively updating the DOM.

Choosing Preact for applications involving critical user interactions, like collecting card details, offers a balance of performance, compatibility, and a familiar development experience.

## Ideas to improve the functionality
- **Auto-Tabbing**: As you mentioned, automatically shifting the focus to the next input field (e.g., from expiry month to expiry year) after the user completes entering valid information can enhance the user experience and save them time.
- **Support for More Cards**: Enhance the app by adding support for additional card issuers, allowing the display of issuer logos for recognized card numbers.
- **Payment Options**: Expanding the payment options beyond debit/credit cards can offer more flexibility to users. Integrating support for popular payment methods like UPI (Unified Payments Interface) and allowing users to enter their UPI virtual addresses can cater to a broader audience and provide alternative payment choices.

## Operational Measures
When handling sensitive data like credit/debit card information, it is crucial to prioritize security. To comply with PCI standards, we can adopt measures to ensure the secure transmission and handling of user data.



## Dev
### CLI Commands

- `npm install`: Installs dependencies

- `npm run dev`: Run a development, HMR server

- `npm run serve`: Run a production-like server

- `npm run build`: Production-ready build

- `npm run lint`: Pass TypeScript files using ESLint
