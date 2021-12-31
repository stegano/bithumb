import Currency from './Bithumb.enums';
/**
 * This Class is for easy use of the Bithumb API.
 * You can use method to request Bithumb API and receive response results.
 * @see https://www.bithumb.com/u1/US127
 * */
declare class Bithumb {
    static _apiUrl: string;
    static _apiKey: string;
    static _apiSecretKey: string;
    /**
     * Sets the Bithumb API Key and API Secret key.
     * @see https://www.bithumb.com/u4/US404
     * */
    static setApiKey(apiKey: string, apiSecretKey: string): void;
    /**
     * Generates authentication header information using API key, API secret key and request information.
     * */
    static makeAuthenticationHeaders(uri: string, data: any): any;
    /**
     * Place a purchase order at the specified price.
     * */
    static purchaseOrder(currencyType: Currency, price: number, count: number, paymentCurreny: Currency): Promise<any>;
    /**
     * Place a sales order at the specified price.
     * */
    static saleOrder(currencyType: Currency, price: number, count: number, paymentCurreny: Currency): Promise<any>;
    /**
     * Place a purchase order at a market price.
     * */
    static purchaseOrderAtMarkerPrice(currencyType: Currency, count: number, paymentCurrency: Currency): Promise<any>;
    /**
     * Place a sales order at a market price.
     * */
    static saleOrderAtMarketPrice(currencyType: Currency, count: number, paymentCurrency: Currency): Promise<any>;
    /**
     * Cancel the incomplete purchase order.
     * */
    static cancelPurchaseOrder(currencyType: Currency, orderId: string): Promise<any>;
    /**
     * Cancel the incomplete sales order.
     * */
    static cancelSaleOrder(currencyType: Currency, orderId: string): Promise<any>;
    /**
     * Get the incomplete purchase Orders.
     * */
    static getPurchaseOrderStatus(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any>;
    /**
     * Get the incomplete sales Orders.
     * */
    static getSaleOrderStatus(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any>;
    /**
     * Get the completed purchase Orders.
     * */
    static getPurchaseOrderResult(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any>;
    /**
     * Get the completed sales Orders.
     * */
    static getSaleOrderResult(currencyType: Currency, orderId: string, count?: number, before?: Date): Promise<any>;
    /**
     * Get the currency information you own.
     * */
    static getMyBalance(currencyType?: Currency | 'ALL'): Promise<any>;
    /**
     * Get your accounts information.
     * */
    static getMyAccount(currencyType?: Currency | 'ALL'): Promise<any>;
    /**
     * Get your currency wallet information.
     * */
    static getMyWalletAddress(currencyType: Currency): Promise<any>;
    /**
     * Get your latest transaction history information.
     * */
    static getMyLatestTransactionHistory(currencyType: Currency): Promise<any>;
    /**
     * Send currency to wallet.
     * */
    static sendToWallet(currencyType: Currency, count: number, address: string, destination?: string): Promise<any>;
    /**
     * Withdraw the won into the registered account.
     * */
    static withdrawAccount(bank: string, account: number, price: number): Promise<any>;
    /**
     * Cancel incomplete orders.
     * */
    private static cancelOrder(type, currencyType, orderId);
    /**
     * Order at the specified price.
     * */
    private static order(type, currencyType, price, count, paymentCurrency?);
    /**
     * Get the incomplete Orders.
     * */
    private static getIncompleteOrders(type, currencyType, orderId, count?, before?, paymentCurrencyType?);
    /**
     * Get the completed Orders.
     * */
    private static getCompletedOrders(type, currencyType, orderId, count?, before?, isReduce?, paymentCurrencyType?);
}
export default Bithumb;
