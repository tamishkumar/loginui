import {callFetch} from '../common/commonDataAccess'
import {getParticipantUriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'

export const systemAdminList = (onCompleteFunc, onErrorFunc) => {
	callFetch(getParticipantUriPath('administrators/system-administrators'),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const findUserProfile = (data,  onCompleteFunc, onErrorFunc) => {
	callFetch(getParticipantUriPath('Profile/search?username='+(data.username || '')+'&domain_name='+data.domain_name),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const createSystemAdmin = (data,  onCompleteFunc, onErrorFunc) => {
	// console.log("api ", data)
	callFetch(getParticipantUriPath('administrators/system-administrators/'+data.participant_id),
		'POST', 201, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const deleteSystemAdmin = (id, onCompleteFunc, onErrorFunc) => {
	// console.log("api ", id)
	callFetch(getParticipantUriPath('administrators/system-administrators/'+id),
		'DELETE', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
