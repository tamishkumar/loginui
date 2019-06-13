import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gameSkillLevelList = (Id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('skill-levels?titlePlatformId='+Id),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const createGameSkillLevel = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('skill-levels'),
		'POST', 201, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

