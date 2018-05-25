import * as request from 'request';
import * as queryString from 'querystring';
import * as CryptoJS from 'crypto-js';
import { Currency } from './Bithumb.enums';

/**
 * This Class is for easy use of the Bithumb API.
 * You can use method to request Bithumb API and receive response results.
 * @see https://www.bithumb.com/u1/US127
 * */
export class Bithumb {
  public static _apiUrl: string = 'https://api.bithumb.com';
  public static _apiKey: string = 'Enter your API Key';
  public static _apiSecretKey: string = 'Enter your API Secret Key';

  /**
   * Sets the Bithumb API Key and API Secret key.
   * @see https://www.bithumb.com/u4/US404
   * */
  public static setApiKey(apiKey: string, apiSecretKey: string) {
    Bithumb._apiKey = apiKey;
    Bithumb._apiSecretKey = apiSecretKey;
  }

  /**
   * Generates authentication header information using API key, API secret key and request information.
   * */
  public static makeAuthenticationHeaders(uri: string, data: any): any {
    const nonce: number = Date.now();
    const apiKey: string = Bithumb._apiKey;
    const apiSecretKey: string = Bithumb._apiSecretKey;
    const splinter: string = String.fromCharCode(0);
    const qs: string = queryString.stringify(data);
    const plainText: string = `${uri}${splinter}${qs}${splinter}${nonce}`;
    return {
      'Api-Key': apiKey,
      'Api-Sign': Buffer.from(CryptoJS.HmacSHA512(plainText, apiSecretKey).toString()).toString('base64'),
      'Api-Nonce': nonce
    }
  }

  /**
   * Place a purchase order at the specified price.
   * */
  public static orderPurchase(currencyType: Currency, price: number, count: number): Promise<any> {
    return Bithumb.order('bid', currencyType, price, count);
  }

  /**
   * Place a sales order at the specified price.
   * */
  public static orderSale(currencyType: Currency, price: number, count: number): Promise<any> {
    return Bithumb.order('ask', currencyType, price, count);
  }

  /**
   * Place a purchase order at a market price.
   * */
  public static orderPurchaseAtMarkerPrice(currencyType: Currency, count: number): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/trade/market_buy';
      const data: any = {
        currency: currencyType,
        units: count,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Place a sales order at a market price.
   * */
  public static orderSaleAtMarketPrice(currencyType: Currency, count: number): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/trade/market_sell';
      const data: any = {
        currency: currencyType,
        units: count
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data,
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Cancel the incomplete purchase order.
   * */
  public static cancelPurchaseOrder(currencyType: Currency, orderId: string): Promise<any> {
    return Bithumb.cancelOrder('bid', currencyType, orderId);
  }

  /**
   * Cancel the incomplete sales order.
   * */
  public static cancelSaleOrder(currencyType: Currency, orderId: string): Promise<any> {
    return Bithumb.cancelOrder('ask', currencyType, orderId);
  }

  /**
   * Get the incomplete purchase Orders.
   * */
  public static getPurchaseOrderStatus(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any> {
    return Bithumb.getIncompleteOrders('bid', currencyType, orderId, count, before);
  }

  /**
   * Get the incomplete sales Orders.
   * */
  public static getSaleOrderStatus(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any> {
    return Bithumb.getIncompleteOrders('ask', currencyType, orderId, count, before);
  }


  /**
   * Get the completed purchase Orders.
   * */
  public static getPurchaseOrderResult(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any> {
    return Bithumb.getCompletedOrders('bid', currencyType, orderId);
  }

  /**
   * Get the completed sales Orders.
   * */
  public static getSaleOrderResult(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any> {
    return Bithumb.getCompletedOrders('ask', currencyType, orderId, count, before);
  }

  /**
   * Get the currency information you own.
   * */
  public static getMyBalance(currencyType: Currency | 'ALL' = 'ALL'): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/info/balance';
      const data: any = {
        currency: currencyType,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Get your accounts information.
   * */
  public static getMyAccount(currencyType: Currency | 'ALL' = 'ALL'): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/info/account';
      const data: any = {
        order_currency: currencyType,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Get your currency wallet information.
   * */
  public static getMyWalletAddress(currencyType: Currency): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/info/wallet_address';
      const data: any = {
        currency: currencyType,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Get your latest transaction history information.
   * */
  public static getMyLatestTransactionHistory(currencyType: Currency): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/info/wallet_address';
      const data: any = {
        order_currency: currencyType,
        endpoint: encodeURIComponent(uri),
        payment_currency: 'KRW'
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Send currency to wallet.
   * */
  public static sendToWallet(currencyType: Currency, count: number, address: string, destination: string): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/trade/btc_withdrawal';
      const data: any = {
        address,
        destination,
        units: count,
        currency: currencyType,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Withdraw the won into the registered account.
   * */
  public static withdrawAccount(bank: string, account: number, price: number): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/info/krw_withdrawal';
      const data: any = {
        account,
        bank,
        price,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Cancel incomplete orders.
   * */
  private static cancelOrder(type: 'bid' | 'ask', currencyType: Currency, orderId: string): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/trade/cancel';
      const data: any = {
        type,
        order_id: orderId,
        apiKey: Bithumb._apiKey,
        secretKey: Bithumb._apiSecretKey,
        currency: currencyType,
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Please order at the specified price.
   * */
  private static order(type: 'bid' | 'ask', currencyType: Currency, price: number, count: number): Promise<any> {
    return new Promise((resolve: Function) => {
      const uri: string = '/trade/place';
      const data: any = {
        type,
        price,
        order_currency: currencyType,
        units: count
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data,
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Get the incomplete Orders.
   * */
  private static getIncompleteOrders(type: 'bid' | 'ask',
                                     currencyType: Currency,
                                     orderId: string,
                                     count: number = 100,
                                     before?: Date): Promise<any> {
    const after: number = !!before ? before.getTime() : 864e4;
    return new Promise((resolve: Function) => {
      const uri: string = '/info/orders';
      const data: any = {
        type,
        after,
        count,
        order_id: orderId,
        currency: currencyType,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        resolve([err, httpRes, body]);
      });
    });
  }

  /**
   * Get the completed Orders.
   * */
  private static getCompletedOrders(type: 'bid' | 'ask',
                                    currencyType: Currency,
                                    orderId: string,
                                    count: number = 100,
                                    before?: Date,
                                    isReduce: boolean = true): Promise<any> {
    const after: number = !!before ? before.getTime() : 864e4;
    return new Promise((resolve: Function) => {
      const uri: string = '/info/order_detail';
      const data: any = {
        type,
        after,
        count,
        order_id: orderId,
        currency: currencyType,
        endpoint: encodeURIComponent(uri)
      };
      request.post({
        url: `${Bithumb._apiUrl}${uri}`,
        json: true,
        headers: {
          ...Bithumb.makeAuthenticationHeaders(uri, data)
        },
        form: data
      }, (err, httpRes, body) => {
        if (!!body && !!body.data && isReduce) {
          if (body.data.length === 1) {
            body.data = body.data[0];
            body.data.units_traded = parseFloat(body.data.units_traded);
            body.data.price = parseInt(body.data.price, 10);
            body.data.fee = parseFloat(body.data.fee);
            body.data.total = parseInt(body.data.total, 10);
          } else {
            body.data = body.data.reduce((a: any, b: any) => {
              if (!b) {
                return a;
              }
              return {
                units_traded: parseFloat(a.units_traded) + parseFloat(b.units_traded),
                price: parseInt(a.price, 10),
                fee: parseFloat(a.fee) + parseFloat(b.fee),
                total: parseInt(a.total, 10) + parseInt(b.total, 10)
              }
            });
          }
        }
        resolve([err, httpRes, body]);
      });
    });
  }
}
