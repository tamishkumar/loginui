import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gameRuleList = (Id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('rules?titlePlatformId='+Id),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const createGameRule = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('rules'),
		'POST', 201, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const particularGameRulesList = (id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath(`rules?titleId=${id}&langId=1000`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
