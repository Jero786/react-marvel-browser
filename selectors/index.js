// Libs
import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

const characters = state => state.get('homeReducer').get('characters');

export const makeGetAppearsSelector = () => {
	return createSelector(
		[characters],
		(characters = fromJS([])) => {
			const characterWithState = characters.map((character => {
				const obj = {};
				obj.characterId = getSafe(character, 'id');
				obj.hasComics = Boolean(getSafe(character, 'comics').get('returned') > 0);
				obj.hasSeries = Boolean(getSafe(character, 'series').get('returned') > 0);
				obj.hasEvents = Boolean(getSafe(character, 'events').get('available') > 0);
				obj.hasStories = Boolean(getSafe(character, 'stories').get('returned') > 0);
				obj.imgSrc = `${getSafe(character, 'thumbnail').get('path')}.${getSafe(character, 'thumbnail').get('extension')}`;
				obj.name = getSafe(character, 'name');
				return fromJS(obj);
			}));
			return fromJS(characterWithState);
		});
};

function getSafe (obj, attr) {
	if (obj && obj.get && obj.get(attr)) {
		return obj.get(attr)
	} else {
		return fromJS({});
	}
}
