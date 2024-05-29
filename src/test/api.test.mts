import { expect, describe, it } from 'vitest';
import * as api from '../api.mjs';

describe('API methods', () => {
  it('should exist', () => {
    expect(api.TemplatePaths).to.contain.keys([
      'COMMON',
      'VUE',
      'VANILLA',
      'MICROSITE',
    ]);
    expect(api.createPackage).to.be.a('function');
  });
});
