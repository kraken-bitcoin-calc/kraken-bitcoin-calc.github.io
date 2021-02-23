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

test('Format positive numbers', () => {
    expect(target.formatNumber(123.454, "eur")).toBe("€123.45");
    expect(target.formatNumber(123.456, "usd")).toBe("$123.46");
    expect(target.formatNumber(1234.567, "eur")).toBe("€1,234.57");
    expect(target.formatNumber(1234, "usd")).toBe("$1,234.00");
    expect(target.formatNumber(123, "eur")).toBe("€123.00");
    expect(target.formatNumber(12.30, "usd")).toBe("$12.30");
    expect(target.formatNumber(12.3, "eur")).toBe("€12.30");
    expect(target.formatNumber(0.005, "usd")).toBe("$0.01");
});

test('Format negative numbers', () => {
    expect(target.formatNumber(-0.01, "eur")).toBe("-€0.01");
    expect(target.formatNumber(-0.009, "usd")).toBe("-$0.01");
    expect(target.formatNumber(-0.005, "eur")).toBe("-€0.01");
});

test('Format zero', () => {
    expect(target.formatNumber(0, "usd")).toBe("$0.00");
    expect(target.formatNumber(-0, "eur")).toBe("€0.00");
    expect(target.formatNumber(-0.0, "usd")).toBe("$0.00");
    expect(target.formatNumber(-0.00, "eur")).toBe("€0.00");
    expect(target.formatNumber(-0.004, "usd")).toBe("$0.00");
    expect(target.formatNumber(-3.8999999999995704e-7, "eur")).toBe("€0.00");
    expect(target.formatNumber(0.004, "usd")).toBe("$0.00");
});
