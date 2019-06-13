import {callFetch} from '../common/commonDataAccess'
import {getGamesriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const gamePowerRankingProfileListApi = (id,onCompleteFunc, onErrorFunc) => {
	callFetch(getGamesriPath(`power-ranking/profiles?skillLevelId=${id}&langId=1000`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}