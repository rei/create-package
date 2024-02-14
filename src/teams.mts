import { userInfo, homedir } from 'os';
import { readFileSync } from 'fs';
import LoggerFactory from './logger.mjs';

const logger = LoggerFactory();
const teamsUrl = 'https://team.rei-cloud.com/rs/teams';

interface Team {
  id: string,
  members: {
    name: string,
    userId: string,
  }[]
}

const getTeam = (
  userId: string,
  teamsArray: Team[],
) => teamsArray
  .find(
    (team: Team) => team.members
      .find(
        (member) => member.userId === userId,
      ),
  )?.id;

/* c8 ignore start */
const getHardshellToken = () => readFileSync(`${homedir()}/hardshell.jwt`, 'utf-8');

const getAllTeams = async () => {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${getHardshellToken()}`);
  logger.info('Looking up team...');
  const response = await fetch(teamsUrl, { headers });
  const allTeams = await response.json();
  return allTeams;
};

const getUserName = () => userInfo().username;
/* c8 ignore end */

export default async (getAllTeamsFn = getAllTeams, getUserNameFn = getUserName) => {
  try {
    const userName = getUserNameFn();
    const allTeams = await getAllTeamsFn();
    const team = getTeam(userName, allTeams);
    if (team) {
      logger.info(`Team: ${team}`);
      return team;
    }
    logger.warn(`User ${userName} is not associated with any team.`);
    return '';
  } catch (e) {
    logger.warn('Unable to get user team id. Ensure you are connected to VPN and have an updated hardshell token (hardshell.jwt in home directory).', e);
    return '';
  }
};
