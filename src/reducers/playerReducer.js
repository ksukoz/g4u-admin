import {
	GET_POSITION,
	GET_PLAYERS,
	MERGE_PLAYER,
	GET_PLAYERS_BY_NAME,
	GET_PLAYERS_REQUESTS,
	GET_REQUESTED_PLAYER,
	GET_PLAYERS_BY_NAME_AND_COMMAND,
	CLEAR_COMMAND_PLAYERS,
	CLEAR_PLAYERS
} from '../actions/types';

const initialState = {
	positions: null,
	members: null,
	requests: null,
	requestedPlayer: null,
	commandPlayers: null,
	errors: null,
	membersForMerge: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_POSITION:
			return {
				...state,
				positions: action.payload
			};

		case GET_PLAYERS:
			return {
				...state,
				members: action.payload
			};
		case GET_PLAYERS_BY_NAME:
			return {
				...state,
				membersForMerge: action.payload.players
			};
		case MERGE_PLAYER:
			return {
				...state,
				errors: action.payload
			};
		case CLEAR_PLAYERS:
			return {
				...state,
				members: action.payload,
				requestedPlayer: action.payload,
				commandPlayers: action.payload,
				membersForMerge: action.payload
			};
		case GET_PLAYERS_REQUESTS:
			return {
				...state,
				requests: action.payload
			};
		case GET_REQUESTED_PLAYER:
			return {
				...state,
				requestedPlayer: action.payload
			};
		case GET_PLAYERS_BY_NAME_AND_COMMAND:
			return {
				...state,
				commandPlayers: action.payload
			};
		case CLEAR_COMMAND_PLAYERS:
			return {
				...state,
				commandPlayers: action.payload
			};
		default:
			return {
				...state,
				commandPlayers: null,
				members: null
			};
	}
}
