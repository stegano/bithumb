"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var request = require("request");
var queryString = require("querystring");
var CryptoJS = require("crypto-js");
/**
 * This Class is for easy use of the Bithumb API.
 * You can use method to request Bithumb API and receive response results.
 * @see https://www.bithumb.com/u1/US127
 * */
var Bithumb = /** @class */ (function () {
    function Bithumb() {
    }
    /**
     * Sets the Bithumb API Key and API Secret key.
     * @see https://www.bithumb.com/u4/US404
     * */
    Bithumb.setApiKey = function (apiKey, apiSecretKey) {
        Bithumb._apiKey = apiKey;
        Bithumb._apiSecretKey = apiSecretKey;
    };
    /**
     * Generates authentication header information using API key, API secret key and request information.
     * */
    Bithumb.makeAuthenticationHeaders = function (uri, data) {
        var nonce = Date.now();
        var apiKey = Bithumb._apiKey;
        var apiSecretKey = Bithumb._apiSecretKey;
        var splinter = String.fromCharCode(0);
        var qs = queryString.stringify(data);
        var plainText = "" + uri + splinter + qs + splinter + nonce;
        return {
            'Api-Key': apiKey,
            'Api-Sign': Buffer.from(CryptoJS.HmacSHA512(plainText, apiSecretKey).toString()).toString('base64'),
            'Api-Nonce': nonce
        };
    };
    /**
     * Place a purchase order at the specified price.
     * */
    Bithumb.orderPurchase = function (currencyType, price, count) {
        return Bithumb.order('bid', currencyType, price, count);
    };
    /**
     * Place a sales order at the specified price.
     * */
    Bithumb.orderSale = function (currencyType, price, count) {
        return Bithumb.order('ask', currencyType, price, count);
    };
    /**
     * Place a purchase order at a market price.
     * */
    Bithumb.orderPurchaseAtMarkerPrice = function (currencyType, count) {
        return new Promise(function (resolve) {
            var uri = '/trade/market_buy';
            var data = {
                currency: currencyType,
                units: count,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Place a sales order at a market price.
     * */
    Bithumb.orderSaleAtMarketPrice = function (currencyType, count) {
        return new Promise(function (resolve) {
            var uri = '/trade/market_sell';
            var data = {
                currency: currencyType,
                units: count
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Cancel the incomplete purchase order.
     * */
    Bithumb.cancelPurchaseOrder = function (currencyType, orderId) {
        return Bithumb.cancelOrder('bid', currencyType, orderId);
    };
    /**
     * Cancel the incomplete sales order.
     * */
    Bithumb.cancelSaleOrder = function (currencyType, orderId) {
        return Bithumb.cancelOrder('ask', currencyType, orderId);
    };
    /**
     * Get the incomplete purchase Orders.
     * */
    Bithumb.getPurchaseOrderStatus = function (currencyType, orderId, count, before) {
        return Bithumb.getIncompleteOrders('bid', currencyType, orderId, count, before);
    };
    /**
     * Get the incomplete sales Orders.
     * */
    Bithumb.getSaleOrderStatus = function (currencyType, orderId, count, before) {
        return Bithumb.getIncompleteOrders('ask', currencyType, orderId, count, before);
    };
    /**
     * Get the completed purchase Orders.
     * */
    Bithumb.getPurchaseOrderResult = function (currencyType, orderId, count, before) {
        return Bithumb.getCompletedOrders('bid', currencyType, orderId);
    };
    /**
     * Get the completed sales Orders.
     * */
    Bithumb.getSaleOrderResult = function (currencyType, orderId, count, before) {
        return Bithumb.getCompletedOrders('ask', currencyType, orderId, count, before);
    };
    /**
     * Get the currency information you own.
     * */
    Bithumb.getMyBalance = function (currencyType) {
        if (currencyType === void 0) { currencyType = 'ALL'; }
        return new Promise(function (resolve) {
            var uri = '/info/balance';
            var data = {
                currency: currencyType,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Get your accounts information.
     * */
    Bithumb.getMyAccount = function (currencyType) {
        if (currencyType === void 0) { currencyType = 'ALL'; }
        return new Promise(function (resolve) {
            var uri = '/info/account';
            var data = {
                order_currency: currencyType,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Get your currency wallet information.
     * */
    Bithumb.getMyWalletAddress = function (currencyType) {
        return new Promise(function (resolve) {
            var uri = '/info/wallet_address';
            var data = {
                currency: currencyType,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Get your latest transaction history information.
     * */
    Bithumb.getMyLatestTransactionHistory = function (currencyType) {
        return new Promise(function (resolve) {
            var uri = '/info/wallet_address';
            var data = {
                order_currency: currencyType,
                endpoint: encodeURIComponent(uri),
                payment_currency: 'KRW'
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Send currency to wallet.
     * */
    Bithumb.sendToWallet = function (currencyType, count, address, destination) {
        return new Promise(function (resolve) {
            var uri = '/trade/btc_withdrawal';
            var data = {
                address: address,
                destination: destination,
                units: count,
                currency: currencyType,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Withdraw the won into the registered account.
     * */
    Bithumb.withdrawAccount = function (bank, account, price) {
        return new Promise(function (resolve) {
            var uri = '/info/krw_withdrawal';
            var data = {
                account: account,
                bank: bank,
                price: price,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Cancel incomplete orders.
     * */
    Bithumb.cancelOrder = function (type, currencyType, orderId) {
        return new Promise(function (resolve) {
            var uri = '/trade/cancel';
            var data = {
                type: type,
                order_id: orderId,
                apiKey: Bithumb._apiKey,
                secretKey: Bithumb._apiSecretKey,
                currency: currencyType
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Please order at the specified price.
     * */
    Bithumb.order = function (type, currencyType, price, count) {
        return new Promise(function (resolve) {
            var uri = '/trade/place';
            var data = {
                type: type,
                price: price,
                order_currency: currencyType,
                units: count
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Get the incomplete Orders.
     * */
    Bithumb.getIncompleteOrders = function (type, currencyType, orderId, count, before) {
        if (count === void 0) { count = 100; }
        var after = !!before ? before.getTime() : 864e4;
        return new Promise(function (resolve) {
            var uri = '/info/orders';
            var data = {
                type: type,
                after: after,
                count: count,
                order_id: orderId,
                currency: currencyType,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                resolve([err, httpRes, body]);
            });
        });
    };
    /**
     * Get the completed Orders.
     * */
    Bithumb.getCompletedOrders = function (type, currencyType, orderId, count, before, isReduce) {
        if (count === void 0) { count = 100; }
        if (isReduce === void 0) { isReduce = true; }
        var after = !!before ? before.getTime() : 864e4;
        return new Promise(function (resolve) {
            var uri = '/info/order_detail';
            var data = {
                type: type,
                after: after,
                count: count,
                order_id: orderId,
                currency: currencyType,
                endpoint: encodeURIComponent(uri)
            };
            request.post({
                url: "" + Bithumb._apiUrl + uri,
                json: true,
                headers: __assign({}, Bithumb.makeAuthenticationHeaders(uri, data)),
                form: data
            }, function (err, httpRes, body) {
                if (!!body && !!body.data && isReduce) {
                    if (body.data.length === 1) {
                        body.data = body.data[0];
                        body.data.units_traded = parseFloat(body.data.units_traded);
                        body.data.price = parseInt(body.data.price, 10);
                        body.data.fee = parseFloat(body.data.fee);
                        body.data.total = parseInt(body.data.total, 10);
                    }
                    else {
                        body.data = body.data.reduce(function (a, b) {
                            if (!b) {
                                return a;
                            }
                            return {
                                units_traded: parseFloat(a.units_traded) + parseFloat(b.units_traded),
                                price: parseInt(a.price, 10),
                                fee: parseFloat(a.fee) + parseFloat(b.fee),
                                total: parseInt(a.total, 10) + parseInt(b.total, 10)
                            };
                        });
                    }
                }
                resolve([err, httpRes, body]);
            });
        });
    };
    Bithumb._apiUrl = 'https://api.bithumb.com';
    Bithumb._apiKey = 'Enter your API Key';
    Bithumb._apiSecretKey = 'Enter your API Secret Key';
    return Bithumb;
}());
exports.Bithumb = Bithumb;
