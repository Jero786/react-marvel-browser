// Libs
import fetch from 'cross-fetch';
import Router from 'next/router';
import {get} from 'lodash/object';

import {
	decorateUrlWithHash,
	decorateUrlWithPagination
} from 'utils';

// Resources
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

// End points

// Actions
export const fetchCharacters = (offset) => ({type: FETCH_CHARACTERS, offset});
export const fetchCharactersSuccess = (characters) => ({type: FETCH_CHARACTERS_SUCCESS, characters});
export const fetchCharactersFailure = () => ({type: FETCH_CHARACTERS_FAILURE});
export const fetchMoreCharacters = (offset) => ({type: FETCH_MORE_CHARACTERS, offset});
export const fetchMoreCharactersSuccess = (characters) => ({type: FETCH_MORE_CHARACTERS_SUCCESS, characters});
export const fetchMoreCharactersFailure = () => ({type: FETCH_MORE_CHARACTERS_FAILURE});
export const fetchCharacterDetail = (characterId) => ({type: FETCH_CHARACTER_DETAIL, characterId});
export const fetchCharacterDetailSuccess = (characterDetail) => ({
	type: FETCH_CHARACTER_DETAIL_SUCCESS,
	characterDetail
});
export const fetchCharacterDetailFailure = () => ({type: FETCH_CHARACTER_DETAIL_FAILURE});

const memorySession = {
	ETag: undefined
};

const header = {
	header: {
		'Accept': 'application/json',
		'If-None-Match': memorySession.ETag,
		'Accept-Encoding': 'gzip'
	}
};

// Action Creators

/**
 * Initial request of Home page to retrieve characters information.
 * @param offset
 * @returns {Function}
 */
export const requestInitialFetch = (offset, characterId) => {
	return async (dispatch) => {
		try {

			dispatch(fetchCharacters(offset));

			const response = await requestCharacters(offset);
			const characters = get(response, 'data.results', []);
			if (characterId) {
				await requestMoreDetail(+characterId);
			}
			dispatch(fetchCharactersSuccess(characters));


		} catch (err) {
			console.error('Error in requestInitialFetch: ' + err);
			dispatch(fetchCharactersFailure());
		}
	}
};

/**
 * Request more action given offset defined.
 * @param {Number} offset
 * @returns {Function}
 */
export const requestMoreCharacters = (offset) => {

	if (offset < 0) {
		return () => {
		};
	}

	return async (dispatch) => {
		try {

			dispatch(fetchMoreCharacters(offset));
			const response = await requestCharacters(offset);
			const characters = get(response, 'data.results', []);
			dispatch(fetchMoreCharactersSuccess(characters));
			routerToOffsetShallowly(offset);

		} catch (err) {
			dispatch(fetchMoreCharactersFailure());
			console.error('Error in requestMoreCharacters: ' + err);
		}
	}
};

/**
 * Request more specific information from given character id.
 * @param characterId
 * @returns {Function}
 */
export const requestMoreDetail = (characterId) => {
	return async (dispatch, state) => {
		try {

			dispatch(fetchCharacterDetail(characterId));

			const offset = state().get('homeReducer').get('offset');
			const response = await requestCharacterDetail(characterId, offset);
			const characterDetail = get(response, 'data.results.0');
			const urls = get(characterDetail, 'urls');
			const responseBiography = await requestCharacterBiography(urls);
			const characterDetailAll = {
				biography: responseBiography,
				urls,
			};
			dispatch(fetchCharacterDetailSuccess(characterDetailAll));
			routerToCharacterShallowly(characterId, offset);

		} catch (err) {
			dispatch(fetchMoreCharactersFailure());
			console.error('Error in requestMoreDetail: ' + err);
		}
	}
};


const requestCharacters = async (offset) => {
	try {

		ifOffsetIsOutOfRange(offset, () => {
			offset = 0;
		});

		let url = decorateUrlWithHash(`${process.env.API_URL}/characters`);
		url = decorateUrlWithPagination(url, offset);
		const response = await fetch(url, header);
		throwErrorWhenBadResponse(response);
		const result = await response.json();
		saveETag(result);
		return result;

	} catch (err) {
		console.error('error in requestCharacters: ' + err);
	}
};

const requestCharacterDetail = async (characterId, offset) => {
	try {

		ifOffsetIsOutOfRange(offset, () => {
			offset = 0;
		});

		const API_CHARACTERS_DETAIL = `${process.env.API_URL}/characters/`;
		let url = decorateUrlWithHash(`${API_CHARACTERS_DETAIL}${characterId}`);
		url = decorateUrlWithPagination(url, offset);
		const response = await fetch(url, header);

		throwErrorWhenBadResponse(response);

		const result = await response.json();
		saveETag(result);
		return result;

	} catch (err) {
		console.error('error in requestCharacterDetail: ' + err);
	}
};

/**
 * Trying to request the biography from given urls.
 * @param urls
 * @returns {Promise<*>}
 */
const requestCharacterBiography = async (urls) => {
	try {

		for (const urlObj of urls) {
			const url = get(urlObj, 'url');
			const response = await fetch(`/marvel-api?url=${url}`);
			const biographyObj = await response.json();
			const biographyText = get(biographyObj, 'biography');
			if (biographyText) {
				return biographyText
			}
		}

	} catch (err) {
		console.error('error in requestCharacterBiography: ' + err);
	}
	return 'Biography not found';
};

function saveETag(result) {
	if (result && result.etag) {
		header.header.ETag = result.etag;
	}
	return result;
}

function ifOffsetIsOutOfRange(offset, onOutOfRange) {
	if (offset < 0) {
		onOutOfRange();
	}
}

function throwErrorWhenBadResponse(response) {
	if (response.status >= 400) {
		throw new Error('Bad response from server ' + JSON.stringify(response));
	}
}

function routerToOffsetShallowly(offset) {
	Router.push('/', {query: {offset}}, {shallow: true});
}

function routerToCharacterShallowly(characterId, offset) {
	Router.push('/', {query: {characterId, offset}}, {shallow: true});
}
