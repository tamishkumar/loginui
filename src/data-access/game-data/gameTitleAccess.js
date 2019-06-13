import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gameTitleList = (regionId, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('Titles?regionId='+regionId),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const createGameTitle = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('Titles'),
						'POST',
						201,
						data,
						getApiHeadersWithToken(),
						onCompleteFunc,
						onErrorFunc);
}

