import { describe, it, expect } from 'vitest';
import startsWith from '../src/main.mjs';

describe('Library tests', () => {
  it('Replace me with a meaningful test', () => {
    const REI = 'Recreational Equipment, Inc.';
    expect(startsWith(REI, 'Recreational')).to.equal(true);
    expect(startsWith(REI, 'Equipment', 13)).to.equal(true);
  });
});