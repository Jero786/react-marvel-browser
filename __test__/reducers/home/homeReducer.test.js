// Libs
import {fromJS} from 'immutable';

// Reducer
import homeReducer from 'reducer/home/home-reducer';

// Actions
import {
	fetchCharacters,
	fetchCharactersSuccess,
	fetchCharactersFailure,
	fetchMoreCharacters,
	fetchMoreCharactersSuccess,
	fetchMoreCharactersFailure,
	fetchCharacterDetail,
	fetchCharacterDetailSuccess,
	fetchCharacterDetailFailure
} from 'actions/home/homeActions'

const emptyState = fromJS({
	isRequestingCharacters: false,
	isRequestingMoreCharacters: false,
	isRequestingCharacterDetail: false,
	offset: 0,
	characters: fromJS([])
});

describe('', () => {

	it('should contain a valid initial state', () => {
		const state = homeReducer();

		expect(state.get('isRequestingCharacters')).toBe(false);
		expect(state.get('isRequestingMoreCharacters')).toBe(false);
		expect(state.get('isRequestingCharacterDetail')).toBe(false);
		expect(state.get('offset')).toBe(0);
		expect(state.get('characters').size).toBe(0);
	});

	it('should compute properly the fetching event', () => {
		const state = homeReducer(emptyState, fetchCharacters(99));

		expect(state.get('isRequestingCharacters')).toBe(true);
		expect(state.get('offset')).toBe(99);
	});

	it('should compute properly the fetching success event', () => {
		const characters = fromJS([{name: 'brisa'}]);
		const state = homeReducer(emptyState, fetchCharactersSuccess(characters));

		expect(state.get('isRequestingCharacters')).toBe(false);
		expect(state.get('characters').get(0).get('name')).toBe('brisa');
	});

	it('should compute properly the fetching failure event', () => {
		const state = homeReducer(emptyState, fetchCharactersFailure());

		expect(state.get('isRequestingCharacters')).toBe(false);
	});

	it('should compute properly the fetching more character event', () => {
		const state = homeReducer(emptyState, fetchMoreCharacters(99));

		expect(state.get('isRequestingMoreCharacters')).toBe(true);
		expect(state.get('offset')).toBe(99);
		expect(state.get('characterDetail')).toBeUndefined();
	});

	it('should compute properly the fetching more character success event', () => {
		const characters = [{name: 'emi'}];
		const state = homeReducer(emptyState, fetchMoreCharactersSuccess(characters));

		expect(state.get('isRequestingMoreCharacters')).toBe(false);
		expect(state.get('characters').get(0).get('name')).toBe('emi');
	});

	it('should compute properly the fetching more character failure event', () => {
		const state = homeReducer(emptyState, fetchMoreCharactersFailure());

		expect(state.get('isRequestingMoreCharacters')).toBe(false);
	});

	it('should compute properly the fetching character detail success event', () => {
		const state = homeReducer(emptyState, fetchCharacterDetail('99'));

		expect(state.get('isRequestingCharacterDetail')).toBe(true);
		expect(state.get('characterDetail')).toBeUndefined();
		expect(state.get('characterDetailId')).toBe('99');
	});

	it('should compute properly the fetching character detail failure event', () => {
		const characterDetail = {name: 'kiki'};
		const state = homeReducer(emptyState, fetchCharacterDetailSuccess(characterDetail));

		expect(state.get('isRequestingCharacterDetail')).toBe(false);
		expect(state.get('characterDetail').get('name')).toBe('kiki');
	});

	it('should compute properly the fetching character detail failure event', () => {
		const state = homeReducer(emptyState, fetchCharacterDetailFailure());

		expect(state.get('isRequestingCharacterDetail')).toBe(false);
	});

});
