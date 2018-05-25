# Bithumb API Library
[![NPM version](https://img.shields.io/npm/v/bithumb.svg)](https://www.npmjs.com/package/bithumb)
[![GitHub issues](https://img.shields.io/github/issues-raw/stegano/bithumb.svg)](https://github.com/stegano/bithumb)
> This library is not an official library provided by Bithumb. 😁


## Installation 
The easiest way to install bithumb is with [npm](https://www.npmjs.com/).

```bash

npm install bithumb

```

Alternately, download the source.

```bash

git clone https://github.com/stegano/bithumb.git

```

## Examples
Set Your API Key and API Secret Key.

```javascript

Bithumb.setApiKey(`<Enter your API Key>`, `<Enter your API Secret Key>`);

```

Get your account information.

```typescript

Bithumb.getMyAccount().then((values) => {
  const [err, httpRes, responseData] = values;
  
  if(!!err) {
    return;
  }
  
  console.log(responseData); // Output your account information.
});

```

Place a purchase order at the specified price.

```typescript

Bithumb.purchaseOrder('BTC', 1000000, 0.1234).then((values) => {
  const [err, httpRes, responseData] = values;
  
  if(!!err) {
    return;
  }
  
  console.log(responseData); // Output the order result.
});

```

#### For more information, see documentation in `./Docs` directory for details. 

## Utils
> Utils that can help you!

### Utils.adjustPrice(amount: number): number
> Adjust the transaction amount to the unit allowed by the Bithumb Exchange API.

### Utils.toFixed(number: number, digits: number = 4): number
> Change the number of decimal places and return the number type.
> This is different from [`number.toFixed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) return type.

### Utils.bithumbApiResponseCodeToString(codeStr: string): string
> Change the Bitumb Exchange API response code to a string

```typescript
Bithumb.purchaseOrder('BTC', 1000000, 0.1234).then((values) => {
  const [err, httpRes, responseData] = values;
  
  if(!!err) {
    return;
  }
  const statusCode: string = responseData.status; // "5300"
  console.log(Utils.bithumbApiResponseCodeToString(statusCode)); // Output "Invalid Apikey"
});

```

Every coin to the moon! 😄