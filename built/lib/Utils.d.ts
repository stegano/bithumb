declare class Utils {
    /**
     * Adjust the transaction amount to the unit allowed by the Bithumb Exchange API.
     * */
    static adjustPrice(amount: number): number;
    /**
     * Change the number of decimal places and return the number type.
     * This is different from abc and return type. Please refer to the following site.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
     * */
    static toFixed(number: number, digits?: number): number;
    /**
     * Change the Bitumb Exchange API response code to a string.
     * @see https://www.bithumb.com/u1/US127
     * */
    static bithumbApiResponseCodeToString(codeStr: string): string;
}
export default Utils;
