import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const powerLevelRakingList = (id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath(`power-ranking/levels?skillLevelId=${id}`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const particularSkillLevel = (id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath(`skill-levels/${id}?langId=1000`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
