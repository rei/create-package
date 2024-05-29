import { expect, vi, describe, it } from 'vitest';
import * as api from '../util.mjs';
import { TemplateType } from '../types/index.mjs';

vi.mock('git-user-info', async (o) => {
  const mod: object = await o();

  const getGitUserInfoMock = vi
    .fn()
    .mockImplementationOnce(async () => ({
      name: 'Bill The Cat',
      email: 'billthecat@pbthpbth.com',
    }))
    .mockImplementationOnce(async () => ({}));

  return {
    ...(mod as object),
    getGitUserInfo: getGitUserInfoMock,
  };
});

describe('API methods', () => {
  it('should exist', () => {
    expect(api.TemplateTypes).to.contain.keys([
      'COMMON',
      'VUE',
      'VANILLA',
      'MICROSITE',
    ]);
    expect(api.packageAuthor).to.be.a('function');
    expect(api.packageNameFilter).to.be.a('function');
    expect(api.run).to.be.a('function');
    expect(api.validateTemplateOption).to.be.a('function');
  });
});

describe('packageNameFilter', () => {
  it('should return appropriate package names', () => {
    expect(api.packageNameFilter('Microsite Lib')).equals('microsite-lib');
    expect(api.packageNameFilter('Another Amazing Site')).equals(
      'another-amazing-site',
    );
    expect(api.packageNameFilter('  So    many   SPaceS   ')).equals(
      'so----many---spaces',
    );
    expect(api.packageNameFilter('Site number 42')).equals('site-number-42');
  });
});

describe('packageAuthor', () => {
  it('should return current git user info if exists', async () => {
    const name = await api.packageAuthor();
    expect(name).equals('Bill The Cat <billthecat@pbthpbth.com>');
  });

  it('should return REI (default git user) if no user', async () => {
    const name = await api.packageAuthor();
    expect(name).equals('REI');
  });
});

describe('validateTemplateOption', () => {
  it('should throw exception if invalid template option', async () => {
    expect(() => api.validateTemplateOption('you want a what now?')).throws();
  });

  it('should return valid template types', async () => {
    const types = ['VUE', 'VANILLA', 'MICROSITE', 'COMMON'];
    types.forEach((type) => {
      expect(api.validateTemplateOption(type)).equals(
        api.TemplateTypes[type as keyof TemplateType],
      );
    });
  });
});
