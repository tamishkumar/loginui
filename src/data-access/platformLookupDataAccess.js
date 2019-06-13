import {callFetch} from './common/commonDataAccess'
import {getPlatformUriPath} from '../data-managers/urlManager'

export const loadRegions = (onCompleteFunc, onErrorFunc) => {
        callFetch(getPlatformUriPath('regions'),
                        'GET',
                        200,
                        null,
                        {
                                'Content-Type': 'application/json; charset=utf-8'  
                        },
                        onCompleteFunc,
                        onErrorFunc);
        }

export const loadLanguages = (onCompleteFunc, onErrorFunc) => {
        callFetch(getPlatformUriPath('languages'),
                        'GET',
                        200,
                        null,
                        {
                                'Content-Type': 'application/json; charset=utf-8'  
                        },
                        onCompleteFunc,
                        onErrorFunc);
        }

export const loadAddressStates = (countryId, onCompleteFunc, onErrorFunc) => {
        callFetch(getPlatformUriPath('address/countries/' + countryId + '/states/'),
                        'GET',
                        200,
                        null,
                        {
                                'Content-Type': 'application/json; charset=utf-8'  
                        },
                        onCompleteFunc,
                        onErrorFunc);
        }
