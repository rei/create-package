import { describe, it, expect } from 'vitest';
import {
  startsWith, getTotal, getFormattedTotal, getMaxPriceItem,
} from '../src/main.mjs';
import type { Product } from '../src/main.mjs';

// 'Replace me with a meaningful tests!'

describe('startsWith', () => {
  const REI = 'Recreational Equipment, Inc.';
  it('should find sub-string at beginning of string', () => {
    expect(startsWith(REI, 'Equipment', 13)).to.equal(true);
  });

  it('should find sub-string with offset', () => {
    expect(startsWith(REI, 'Equipment', 13)).to.equal(true);
  });
});

// Test product data.
const products: Product[] = [{
  sku: 'abc123',
  name: 'Product 1',
  description: 'Product 1 description',
  price: 94.00,
}, {
  sku: 'def456',
  name: 'Product 2',
  description: 'Product 2 description',
  price: 189.99,
}, {
  sku: 'ghi123',
  name: 'Product 3',
  description: 'Product 3 description',
  price: 72.58,
}];

describe('getTotal', () => {
  it('should get total', () => {
    expect(getTotal(products)).to.equal(356.57);
  });
});

describe('getFormattedTotal', () => {
  it('should format product total', () => {
    expect(getFormattedTotal(products)).to.equal('$356.57');
  });
});

describe('getMaxPrice', () => {
  it('should get product with max price', () => {
    expect(getMaxPriceItem(products)).to.equal(products.at(0));
  });

  it('should return null if no products', () => {
    expect(getMaxPriceItem([])).to.equal(null);
  });
});
