const target = require('../src/script');

test('EUR fees', () => {
    var [profit, buyOrderFee, sellOrderFee] = target.calcProfitAndFees(1000, 500, 50000, 10, "eur");
    expect(profit).toBeCloseTo(24416.16);
    expect(buyOrderFee).toBeCloseTo(1.3);
    expect(sellOrderFee).toBeCloseTo(64.95);
});

test('USD fees', () => {
    var [profit, buyOrderFee, sellOrderFee] = target.calcProfitAndFees(7654.32, 1234.56, 87654.32, 12.34, "usd");
    expect(profit).toBeCloseTo(12833.76);
    expect(buyOrderFee).toBeCloseTo(3.21);
    expect(sellOrderFee).toBeCloseTo(36.69);
});

test('Negative profit', () => {
    var [profit, buyOrderFee, sellOrderFee] = target.calcProfitAndFees(1001, 55, 1000.5, 2, "usd");
    expect(profit).toBeCloseTo(-6.46);
    expect(buyOrderFee).toBeCloseTo(0.14);
    expect(sellOrderFee).toBeCloseTo(0.14);
});
