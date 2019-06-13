import {callFetch} from './common/commonDataAccess'
import {getIdentityUriPath} from '../data-managers/urlManager'

export const startRegistrationProcess = (data, onCompleteFunc, onErrorFunc) => {
	callFetch(getIdentityUriPath('api/registration/start'),
						'POST',
						201,
						data,
						{
										'Content-Type': 'application/json; charset=utf-8'  
						},
						onCompleteFunc,
						onErrorFunc);
}

export const getStartedRegistration = (registrationId, onCompleteFunc, onErrorFunc) => {
	callFetch(getIdentityUriPath('api/Registration/started/' + registrationId),
						'GET',
						200,
						null,
						{
										'Content-Type': 'application/json; charset=utf-8'  
						},
						onCompleteFunc,
						onErrorFunc);
}

export const registrationComplete = (registrationId, data, onCompleteFunc, onErrorFunc) => {
	callFetch(getIdentityUriPath('api/Registration/complete/' + registrationId),
						'POST',
						201,
						data,
						{
										'Content-Type': 'application/json; charset=utf-8'  
						},
						onCompleteFunc,
						onErrorFunc);
}

