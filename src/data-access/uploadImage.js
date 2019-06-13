import {callFetch} from './common/commonDataAccess'
import {getPlatformUriPath, uploadFile} from '../data-managers/urlManager'

export const uploadGameTitleFile = (data, onCompleteFunc, onErrorFunc) => {
	uploadGameFile('title', data, onCompleteFunc, onErrorFunc);
}

export const uploadGamePlatformFile = (data, onCompleteFunc, onErrorFunc) => {
	uploadGameFile('platform', data, onCompleteFunc, onErrorFunc);
}

export const uploadGameSkillLevelFile = (data, onCompleteFunc, onErrorFunc) => {
	uploadGameFile('skilllevel', data, onCompleteFunc, onErrorFunc);
}

const uploadGameFile = (fileType, data, onCompleteFunc, onErrorFunc) => {
	callFetch(getPlatformUriPath('Files/Upload/' + fileType),
						'POST',
						201,
						data,
						uploadFile(),
						onCompleteFunc,
						onErrorFunc, false);
}

