// Constants
const XBT_WITHDRAW_FEE = 0.00015;
const EUR_WITHDRAW_FEE = 0.09;
const USD_WITHDRAW_FEE = 4;
const MARKET_ORDER_FEE = 0.0026;
const CURRENCY_SYMBOLS = {
    "usd" : "$",
    "eur" : "€"
};

function updateResult() {
    var currency = document.getElementById("currency").value;
    var buyXbtPrice = parseFloat(document.getElementById("buy-price").value);
    var buyOrderCost = parseFloat(document.getElementById("buy-cost").value);
    var sellXbtPrice = parseFloat(document.getElementById("sell-price").value);
    var sellTxFee = parseFloat(document.getElementById("sell-tx-fee").value);

    // Validate form values
    if (!currency in CURRENCY_SYMBOLS) {
        showError();
        return;
    }
    if (isNaN(buyXbtPrice) || buyXbtPrice <= 0 || isNaN(buyOrderCost) || buyOrderCost <= 0 || isNaN(sellXbtPrice) || sellXbtPrice <= 0 || isNaN(sellTxFee) || sellTxFee < 0) {
        showError();
        return;
    }

    var [profit, buyOrderFee, sellOrderFee]  = calcProfitAndFees(buyXbtPrice, buyOrderCost, sellXbtPrice, sellTxFee, currency);
    if (profit < 0) {
        document.getElementById("result-profit").style.color = "red";
    } else {
        document.getElementById("result-profit").style.color = "green";
    }
    document.getElementById("result-profit").innerText = formatNumber(profit, currency);
    document.getElementById("result-buy-fee").innerText = formatNumber(buyOrderFee, currency);
    document.getElementById("result-sell-fee").innerText = formatNumber(sellOrderFee, currency);
}

function calcProfitAndFees(buyXbtPrice, buyOrderCost, sellXbtPrice, sellTxFee, currency) {
    // Buy
    var buyOrderFee = MARKET_ORDER_FEE * buyOrderCost;
    var buyXbtAmount = buyOrderCost / buyXbtPrice - XBT_WITHDRAW_FEE;
    // Sell
    var sellTxFeeBtc = sellTxFee / sellXbtPrice; // Convert to XBT
    var sellXbtAmount = buyXbtAmount - sellTxFeeBtc;
    var sellOrderCost = sellXbtPrice * sellXbtAmount;
    var sellOrderFee = MARKET_ORDER_FEE * sellOrderCost;
    // Profit
    var withdrawFee = currency == "usd" ? USD_WITHDRAW_FEE : EUR_WITHDRAW_FEE;
    profit = sellOrderCost - sellOrderFee - buyOrderCost - buyOrderFee - withdrawFee;
    return [profit, buyOrderFee, sellOrderFee];
}

function formatNumber(n, currency) {
    var s = n.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2
    });
    if (s == "-" + CURRENCY_SYMBOLS[currency] + "0.00") {
        s = s.substring(1); // Remove negative sign
    }
    return s;
}

function onSelectCurrency() {
    var currency = document.getElementById("currency").value;
    document.querySelectorAll(".currency-symbol").forEach(e => {
        e.innerText = CURRENCY_SYMBOLS[currency];
    });
}

function showError() {
    document.getElementById("result-profit").innerText = "Error!";
    document.getElementById("result-profit").style.color = "red";
    document.getElementById("result-buy-fee").innerText = "";
    document.getElementById("result-sell-fee").innerText = "";
}

function handleKey(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        updateResult();
    }
}

if (typeof exports !== "undefined") {
    module.exports = { 
        calcProfitAndFees,
        formatNumber
    };
}
