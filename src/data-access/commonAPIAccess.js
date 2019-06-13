import {callFetch} from './common/commonDataAccess'
import {getPlatformUriPath, uploadFile, getApiHeadersWithToken} from '../data-managers/urlManager'

export const Regions = ( onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('Regions'), 'GET', 200, null,  {'Content-Type': 'application/json'} , onCompleteFunc, onErrorFunc);
}

export const Languages = (onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('Languages'), 'GET', 200, null,  {'Content-Type': 'application/json'}, onCompleteFunc, onErrorFunc);
}

export const Templates = (onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('email-templates/types'), 'GET', 200, null,  getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}

export const Placeholders = (onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('email-templates/placeholders'), 'GET', 200, null,  getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}