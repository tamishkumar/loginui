import {getAuthToken} from './cookieManager.js'

// const IdentityUri = "https://localhost:44364/";
// const PlatformUri = "https://localhost:44399/api/";
// const MatchUri = "https://localhost:44329/api/";
// const TournamentUri = "https://localhost:44331/api/";
// const GamesUri = "https://localhost:44360/api/";
// const ParticipantUri = "https://localhost:44365/api/";

const IdentityUri = "http://eacl.v3.api.identity.llsinttools.net/";
const PlatformUri = "http://eacl.v3.api.platform.llsinttools.net/api/";
const MatchUri = "http://eacl.v3.api.match.llsinttools.net/api/";
const TournamentUri = "http://eacl.v3.api.tournament.llsinttools.net/api/";
const GamesUri = "http://eacl.v3.api.games.llsinttools.net/api/";
const ParticipantUri = "http://eacl.v3.api.participant.llsinttools.net/api/";

export const getIdentityUriPath = (path) => {
    return IdentityUri + path;
}

export const getPlatformUriPath = (path) => {
    return PlatformUri + path;
}

export const getMatchUriPath = (path) => {
    return MatchUri + path;
}

export const getTournamentUriPath = (path) => {
    return TournamentUri + path;
}

export const getGamesriPath = (path) => {
    return GamesUri + path;
}

export const getParticipantUriPath = (path) => {
    return ParticipantUri + path;
}

export const getApiHeaders = () => ({
    'Content-Type':'application/json',
    'cache-control':'no-cache',
    'pragma':'no-cache',
    'Authorization':'bearer ' + getAuthToken()
});

export const getApiHeadersWithToken = () => ({
    'Content-Type':'application/json',
    'Authorization':'bearer ' + getAuthToken()
});

export const uploadFile = () => ({
    'Authorization':'bearer ' + getAuthToken()
});
