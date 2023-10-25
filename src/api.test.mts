import { expect } from 'vitest';
import * as api from './api.mjs';

describe('API methods', () => {
  it('should exist', () => {
    expect(api.CONFIG.NODE_VERSION).equals('16.20.2');
    expect(api.TemplatePaths).to.contain.keys(['COMMON', 'VUE', 'VANILLA', 'MICROSITE']);
    expect(api.createPackage).to.be.a('function');
  });
});
