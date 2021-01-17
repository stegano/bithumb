"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Currency,request=require("request"),queryString=require("querystring"),CryptoJS=require("crypto-js"),__assign=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e};!function(e){e.BTC="BTC",e.ETH="ETH",e.DASH="DASH",e.LTC="LTC",e.ETC="ETC",e.XRP="XRP",e.BCH="BCH",e.XMR="XMR",e.ZEC="ZEC",e.QTUM="QTUM",e.BTG="BTG",e.EOS="EOS",e.ICX="ICX",e.VEN="VEN",e.TRX="TRX",e.ELF="ELF",e.MITH="MITH",e.MCO="MCO",e.OMG="OMG",e.KNC="KNC",e.GNT="GNT",e.HSR="HSR",e.ZIL="ZIL",e.ETHOS="ETHOS",e.PAY="PAY",e.WAX="WAX",e.POWR="POWR",e.LRC="LRC",e.GTO="GTO",e.STEEM="STEEM",e.STRAT="STRAT",e.KRW="KRW"}(Currency||(Currency={}));var Currency$1=Currency,Bithumb=function(){function c(){}return c.setApiKey=function(e,r){c._apiKey=e,c._apiSecretKey=r},c.makeAuthenticationHeaders=function(e,r){var t=Date.now(),n=c._apiKey,a=c._apiSecretKey,o=String.fromCharCode(0),i=""+e+o+queryString.stringify(r)+o+t;return{"Api-Key":n,"Api-Sign":Buffer.from(CryptoJS.HmacSHA512(i,a).toString()).toString("base64"),"Api-Nonce":t}},c.purchaseOrder=function(e,r,t,n){return c.order("bid",e,r,t,n)},c.saleOrder=function(e,r,t,n){return c.order("ask",e,r,t,n)},c.purchaseOrderAtMarkerPrice=function(t,a){return new Promise(function(n){var e="/trade/market_buy",r={currency:t,units:a,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.saleOrderAtMarketPrice=function(t,a){return new Promise(function(n){var e="/trade/market_sell",r={currency:t,units:a};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.cancelPurchaseOrder=function(e,r){return c.cancelOrder("bid",e,r)},c.cancelSaleOrder=function(e,r){return c.cancelOrder("ask",e,r)},c.getPurchaseOrderStatus=function(e,r,t,n){return c.getIncompleteOrders("bid",e,r,t,n)},c.getSaleOrderStatus=function(e,r,t,n){return c.getIncompleteOrders("ask",e,r,t,n)},c.getPurchaseOrderResult=function(e,r,t,n){return c.getCompletedOrders("bid",e,r)},c.getSaleOrderResult=function(e,r,t,n){return c.getCompletedOrders("ask",e,r,t,n)},c.getMyBalance=function(t){return void 0===t&&(t="ALL"),new Promise(function(n){var e="/info/balance",r={currency:t,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.getMyAccount=function(t){return void 0===t&&(t="ALL"),new Promise(function(n){var e="/info/account",r={order_currency:t,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.getMyWalletAddress=function(t){return new Promise(function(n){var e="/info/wallet_address",r={currency:t,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.getMyLatestTransactionHistory=function(t){return new Promise(function(n){var e="/info/wallet_address",r={order_currency:t,endpoint:encodeURIComponent(e),payment_currency:"KRW"};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.sendToWallet=function(t,a,o,i){return new Promise(function(n){var e="/trade/btc_withdrawal",r={address:o,destination:i,units:a,currency:t,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.withdrawAccount=function(t,a,o){return new Promise(function(n){var e="/info/krw_withdrawal",r={account:a,bank:t,price:o,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.cancelOrder=function(t,a,o){return new Promise(function(n){var e="/trade/cancel",r={type:t,order_id:o,apiKey:c._apiKey,secretKey:c._apiSecretKey,currency:a};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.order=function(t,a,o,i,u){return void 0===u&&(u=Currency$1.KRW),new Promise(function(n){var e="/trade/place",r={type:t,price:o,order_currency:a,units:i,payment_currency:u};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.getIncompleteOrders=function(t,a,o,i,e){void 0===i&&(i=100);var u=e?e.getTime():864e4;return new Promise(function(n){var e="/info/orders",r={type:t,after:u,count:i,order_id:o,currency:a,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){n([e,r,t])})})},c.getCompletedOrders=function(t,a,o,i,e,u){void 0===i&&(i=100),void 0===u&&(u=!0);var s=e?e.getTime():864e4;return new Promise(function(n){var e="/info/order_detail",r={type:t,after:s,count:i,order_id:o,currency:a,endpoint:encodeURIComponent(e)};request.post({url:""+c._apiUrl+e,json:!0,headers:__assign({},c.makeAuthenticationHeaders(e,r)),form:r},function(e,r,t){t&&t.data&&u&&(1===t.data.length?(t.data=t.data[0],t.data.units_traded=parseFloat(t.data.units_traded),t.data.price=parseInt(t.data.price,10),t.data.fee=parseFloat(t.data.fee),t.data.total=parseInt(t.data.total,10)):t.data=t.data.reduce(function(e,r){return r?{units_traded:parseFloat(e.units_traded)+parseFloat(r.units_traded),price:parseInt(e.price,10),fee:parseFloat(e.fee)+parseFloat(r.fee),total:parseInt(e.total,10)+parseInt(r.total,10)}:e})),n([e,r,t])})})},c._apiUrl="https://api.bithumb.com",c._apiKey="Enter your API Key",c._apiSecretKey="Enter your API Secret Key",c}(),Utils=function(){function e(){}return e.adjustPrice=function(e){var r=0,t=0;return 1e6<=e?(t=1e3-(r=e%1e3),e+(500<=r?+t:-r)):5e5<=e?(t=500-(r=e%500),e+(250<=r?+t:-r)):1e5<=e?(t=100-(r=e%100),e+(50<=r?+t:-r)):1e4<=e?(t=10-(r=e%10),e+(5<=r?+t:-r)):1e3<=e?(t=5-(r=e%5),e+(2.5<=r?+t:-r)):e},e.toFixed=function(e,r){return void 0===r&&(r=4),parseFloat(e.toFixed(r))},e.bithumbApiResponseCodeToString=function(e){switch(e){case"5100":return"Bad Request";case"5200":return"Not Member";case"5300":return"Invalid Apikey";case"5302":return"Method Not Allowed";case"5400":return"Database Fail";case"5500":return"Invalid Parameter";case"5600":return"Output a contextual message";case"5900":return"Unknown Error";case"0000":return"Success";default:return"Unknown"}},e}();exports.Bithumb=Bithumb,exports.Utils=Utils,exports.Currency=Currency$1;
