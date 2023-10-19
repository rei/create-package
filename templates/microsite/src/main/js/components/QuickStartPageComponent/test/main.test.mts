import {
  describe, test, expect,
} from 'vitest';

import createApp, { getClientPageData, init } from '../main.mjs';
import type { GenericStringKeyValueObject } from '../../../types/shared.types.mjs';

/**
 * Helper function to add pageData to page.
 */
function addPageDataToPage(data: GenericStringKeyValueObject): void {
  const dataContainerEl = document.createElement('script');
  dataContainerEl.type = 'application/json';
  dataContainerEl.id = 'modelData';
  const pageData = data;
  dataContainerEl.innerHTML = JSON.stringify(pageData);
  document.body.append(dataContainerEl);
}

/**
 * Helper function to create the mount element
 */
function addMountEl(id: string) {
  const mountEL = document.createElement('div');
  document.body.append(mountEL);
  mountEL.id = id;
}

describe('createApp', () => {
  test('should return ssr app instance', () => {
    expect(createApp({ a: 'a', b: 'b' })).to.be.an('object');
  });
});

describe('getClientPageData', () => {
  test('should return empty pageData object if not found', () => {
    expect(getClientPageData()).to.eql({ pageData: {} });
  });

  test('should return populated pageData object if found', () => {
    const pageData = { a: 'a', b: 'b' };
    addPageDataToPage(pageData);
    expect(getClientPageData()).to.eql(pageData);
  });
});

describe('getClientPageData', () => {
  test('should return pageData from the page.', () => {
    expect(getClientPageData()).to.be.an('object');
  });
});

describe('init', () => {
  test('should mount app with props from page', () => {
    const pageData = { a: 'a', b: 'b' };
    addPageDataToPage(pageData);
    addMountEl('app');
    expect(init()).to.be.an('object');
  });
});
