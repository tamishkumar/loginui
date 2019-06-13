import {callFetch} from '../common/commonDataAccess'
import {getTournamentUriPath, getApiHeadersWithToken} from '../../data-managers/urlManager'


export const tournamentLevel = (onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`attributes/tournament-levels`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const attributesPairingTypes = (onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`attributes/pairing-types`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const prizeTypes = (onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`attributes/prize-types`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const createLeague = (data,  onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath('Leagues'),
		'POST', 201, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const createAnnouncement = (data,  onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath('league-announcements'),
		'POST', 201, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const leagueSearchApi = (state,regionId,titleId,platformId,onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`Leagues/search?game_title_id=${titleId}&only_needing_leagues=${state}&game_platform_id=${platformId}&regionId=${regionId}&langId=1000`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const announcement = (leagueId,onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`league-announcements/${leagueId}?langId=1000`),
		'GET', 200, null, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const announcementDelete = (deleteLeagueAnnouncementId,data,onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`league-announcements/${deleteLeagueAnnouncementId}`),
		'PATCH', 200, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
export const announcementEdit = (editLeagueAnnouncementId,data,onCompleteFunc, onErrorFunc) => {
	callFetch(getTournamentUriPath(`league-announcements/${editLeagueAnnouncementId}`),
		'PATCH', 200, data, getApiHeadersWithToken(), onCompleteFunc, onErrorFunc);
}
