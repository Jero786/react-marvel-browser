// Libs
import {fromJS} from 'immutable';
import {get} from 'lodash/object';

// Actions
import {
	FETCH_CHARACTERS,
	FETCH_CHARACTERS_SUCCESS,
	FETCH_CHARACTERS_FAILURE,
	FETCH_MORE_CHARACTERS,
	FETCH_MORE_CHARACTERS_SUCCESS,
	FETCH_MORE_CHARACTERS_FAILURE,
	FETCH_CHARACTER_DETAIL,
	FETCH_CHARACTER_DETAIL_SUCCESS,
	FETCH_CHARACTER_DETAIL_FAILURE,
} from 'constants/action-types';

// Resources
const emptyState = fromJS({
	isRequestingCharacters: false,
	isRequestingMoreCharacters: false,
	isRequestingCharacterDetail: false,
	offset: 0,
	characters: fromJS([])
});

const homeReducer = (state = emptyState, action = {type: ''}) => {
	switch (action.type) {

		case FETCH_CHARACTERS: {
			return state.merge({
				isRequestingCharacters: true,
				offset: action.offset
			});
		}

		case FETCH_CHARACTERS_SUCCESS: {
			const characters = action.characters;
			return state.merge({
				isRequestingCharacters: false,
				characters: fromJS(characters)
			});
		}

		case FETCH_CHARACTERS_FAILURE: {
			return state.merge({isRequestingCharacters: false});
		}

		case FETCH_MORE_CHARACTERS: {
			return state.merge({
				isRequestingMoreCharacters: true,
				characterDetail: undefined,
				offset: action.offset
			});
		}

		case FETCH_MORE_CHARACTERS_SUCCESS: {
			const characters = action.characters;
			return state.merge({
				isRequestingMoreCharacters: false,
				characters: fromJS(characters)
			});
		}

		case FETCH_MORE_CHARACTERS_FAILURE: {
			return state.merge({isRequestingMoreCharacters: false});
		}

		case FETCH_CHARACTER_DETAIL: {
			const characterDetailId = get(action, 'characterId');
			return state.merge({
				characterDetail: undefined,
				isRequestingCharacterDetail: true,
				characterDetailId
			});
		}

		case FETCH_CHARACTER_DETAIL_SUCCESS: {
			const characterDetail = get(action, 'characterDetail');
			return state.merge({
				isRequestingCharacterDetail: false,
				characterDetail
			});
		}

		case FETCH_CHARACTER_DETAIL_FAILURE: {
			return state.merge({isRequestingCharacterDetail: false});
		}

		default:
			return state
	}
};



export default homeReducer;
