import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gameModeMapsList = (Id, RId,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('maps?titleId='+Id), //+'&langId='+RId
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const creategameModeMap = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('maps'),
		'POST', 201, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}