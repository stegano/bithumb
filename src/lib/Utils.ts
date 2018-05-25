export class Utils {
  /**
   * Adjust the transaction amount to the unit allowed by the Bithumb Exchange API.
   * */
  public static adjustPrice(amount: number): number {
    let diff: number = 0;
    let weight: number = 0;

    // 1000
    if (amount >= 1000000) {
      diff = amount % 1000;
      weight = 1000 - diff;
      return amount + (diff >= 1000 / 2 ? +weight : -diff);
    }

    // 500
    if (amount >= 500000) {
      diff = amount % 500;
      weight = 500 - diff;
      return amount + (diff >= 500 / 2 ? +weight : -diff);
    }

    // 100
    if (amount >= 100000) {
      diff = amount % 100;
      weight = 100 - diff;
      return amount + (diff >= 100 / 2 ? +weight : -diff);
    }

    // 10
    if (amount >= 10000) {
      diff = amount % 10;
      weight = 10 - diff;
      return amount + (diff >= 10 / 2 ? +weight : -diff);
    }

    // 5
    if (amount >= 1000) {
      diff = amount % 5;
      weight = 5 - diff;
      return amount + (diff >= 5 / 2 ? +weight : -diff);
    }
    return amount;
  }

  /**
   * Change the number of decimal places and return the number type.
   * This is different from abc and return type. Please refer to the following site.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
   * */
  public static toFixed(number: number, digits: number = 4): number {
    return parseFloat(number.toFixed(digits));
  }

  /**
   * Change the Bitumb Exchange API response code to a string.
   * @see https://www.bithumb.com/u1/US127
   * */
  public static bithumbApiResponseCodeToString(codeStr: string): string {
    switch (codeStr) {
      case '5100':
        return 'Bad Request';
      case '5200':
        return 'Not Member';
      case '5300':
        return 'Invalid Apikey';
      case '5302':
        return 'Method Not Allowed';
      case '5400':
        return 'Database Fail';
      case '5500':
        return 'Invalid Parameter';
      case '5600':
        return 'Output a contextual message';
      case '5900':
        return 'Unknown Error';
      case '0000':
        return 'Success';
      default:
        return 'Unknown';
    }
  }
}
