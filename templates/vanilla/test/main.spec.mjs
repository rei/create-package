import { describe, it, expect } from 'vitest';
import startsWith from '../src/main';

describe('Library tests', () => {
  it('Replace me with a meaningful test', () => {
    const REI = 'Recreational Equipment, Inc.';
    expect(startsWith(REI, 'Recreational')).to.equal(true);
  });
});
