import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gamePlatfromList = (onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('Platforms'),
						'GET',
						200,
						null,
						getApiHeadersWithToken(),
						onCompleteFunc,
						onErrorFunc);
}

export const createGamePlatform = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('Platforms'),
						'POST',
						201,
						data,
						getApiHeadersWithToken(),
						onCompleteFunc,
						onErrorFunc);
}

