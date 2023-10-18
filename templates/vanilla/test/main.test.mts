import { describe, it, expect } from 'vitest';
import {
  startsWith, getTotal, getMaxPriceItem,
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

describe('getTotal', () => {
  const products: Product[] = [{
    sku: 'abc123',
    name: 'Product 1',
    description: 'Product 1 description',
    price: 123.45,
  }, {
    sku: 'def456',
    name: 'Product 2',
    description: 'Product 2 description',
    price: 456.78,
  }];
  it('sum products', () => {
    expect(getTotal(products)).to.equal(580.23);
  });

  it('get product with max price', () => {
    expect(getMaxPriceItem(products)).to.equal(products.at(0));
  });
});
