## Kraken Bitcoin Profit Calculator

*Warning*: Because Kraken fees can change without notice at any time, this calculator may not be accurate.

## Description

This is a simple profit calculator for the casual long-term Bitcoin investor. As such, and unlike other calculators, it assumes that bitcoins are not left in the exchange, but rather transferred to a personal wallet.

A few assumptions are made that may not work for everybody:

- Once bought, bitcoins are withdrawn to a personal wallet, meaning that a withdrawal fee is charged
- Before selling, bitcoins are sent from the personal wallet back to Kraken, meaning that a transaction fee is charged
- Buy and sell orders are market orders, meaning that a taker fee is charged
- The 30-day trading volume is $0.00
- All deposit/withdrawal minimums are met

In particular, the following fee values are used:

- Taker order: 0.26%
- XBT withdrawal: ₿0.00015
- USD withdrawal (FedWire): $4.00
- EUR withdrawal (Fidor AG): €0.09

## How to use

The calculator is available at <https://kraken-bitcoin-calc.github.io>. Alternatively, it is possibile to download the project repository and open `index.html` locally.

## Contributing

The scope of this project is intended to be limited. Because of this, pull requests implementing new features such as adding support for other currencies will not be merged. Bug reports and pull requests fixing bugs are of course welcome.

After making changes, tests can be run as follows:

```
npm install --also-dev # Needed only once
npm run test
```
