import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gameTitlePlatfromList = (regionId,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('title-platforms/region/'+regionId),
						'GET',
						200,
						null,
						getApiHeadersWithToken(),
						onCompleteFunc,
						onErrorFunc);
}
export const gameTitlePlatformByTitleId = (titleId,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath(`title-platforms/title/${titleId}?langId=1000`),
						'GET',
						200,
						null,
						getApiHeadersWithToken(),
						onCompleteFunc,
						onErrorFunc);
}

export const createGameTitlePlatform = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath('title-platforms'),
						'POST',
						201,
						data,
						getApiHeadersWithToken(),
						onCompleteFunc,
						onErrorFunc);
}

