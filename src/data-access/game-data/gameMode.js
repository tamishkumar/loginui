import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gameModeList = (Id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('Modes?titlePlatformId='+Id),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const createGameMode = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('Modes'),
		'POST', 201, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const particularModeList = (Id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath(`Modes?titleId=${Id}&langId=1000`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}