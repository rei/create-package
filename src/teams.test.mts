import { expect } from 'vitest';
import getTeam from './teams.mjs';

const allTeamsApiCallTestData = [
  {
    id: 'team1',
    name: 'Team 1',
    members: [{
      id: 1,
      userId: 'user1',
      firstName: 'First1',
      lastName: 'Last1',
    }, {
      id: 2,
      userId: 'user2',
      firstName: 'First2',
      lastName: 'Last2',
    }],
  },
  {
    id: 'team2',
    name: 'Team 2',
    members: [{
      id: 3,
      userId: 'user3',
      firstName: 'First3',
      lastName: 'Last3',
    }, {
      id: 4,
      userId: 'user4',
      firstName: 'First4',
      lastName: 'Last4',
    }],
  },
];

describe('getTeam function', () => {
  it('should exist', () => {
    expect(getTeam).to.be.a('function');
  });

  it('should return user team', async () => {
    const teamId1 = await getTeam(() => Promise.resolve(allTeamsApiCallTestData), () => 'user1');
    expect(teamId1).to.equal('team1');

    const teamId2 = await getTeam(() => Promise.resolve(allTeamsApiCallTestData), () => 'user3');
    expect(teamId2).to.equal('team2');
  });

  it('should return empty string if no user team found', async () => {
    const teamId = await getTeam(() => Promise.resolve(allTeamsApiCallTestData), () => 'user5');
    expect(teamId).to.be.a('string');
    expect(teamId.length).equals(0);
  });

  it('should return empty string if exception is thrown (no hardshell token, fetch error)', async () => {
    const teamId = await getTeam(() => new Promise(() => {
      throw new Error();
    }), () => 'user2');
    expect(teamId).to.be.a('string');
    expect(teamId.length).equals(0);
  });
});
