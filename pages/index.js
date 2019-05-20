// Resources
import './index.scss';
import {OFFSET_PAGE} from 'constants';
import PropTypes from 'prop-types';

// Libs
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fromJS} from 'immutable';

// Components
import Layout from 'components/layout';
import Loading from 'components/loading/loading';
import HeroList from 'components/hero-list/hero-list';
import HeroListItem from 'components/hero-list/hero-list-item';
import HeroDetail from 'components/hero-detail/hero-detail';

// Actions
import {
	requestInitialFetch,
	requestMoreCharacters,
	requestMoreDetail
} from 'actions/home/homeActions';

// Selectors
import {makeGetAppearsSelector} from 'selectors';

export class MarvelBrowser extends React.PureComponent {

	static async getInitialProps({req, store, query}) {
		const offset = +(query.offset);
		const characterId = query.characterId;
		const isServer = !!req;
		await store.dispatch(requestInitialFetch(offset, characterId));
		return {isServer, offset, characterId};
	}

	render() {
		const {
			offset = 0,
			characters = fromJS([]),
			requestMoreCharacters,
			requestMoreDetail,
			characterDetail,
			isRequestingMoreCharacters,
			isRequestingCharacterDetail,
			characterDetailId
		} = this.props;

		let characterDetailEl;

		if (characterDetail) {
			const characterDetailTarget = characters.find(character => character.get('characterId') === characterDetailId) || fromJS({});
			characterDetailEl = (
  <HeroDetail
    name={characterDetailTarget.get('name')}
    imgSrc={characterDetailTarget.get('imgSrc')}
    biography={characterDetail.get('biography')}
    urls={characterDetail.get('urls').toJS()}
  />
			);
		} else if (!isRequestingCharacterDetail && !isRequestingMoreCharacters) {
			characterDetailEl = (<span className="non-selected-hero">Please select a hero!</span>);
		}

		return (
  <section className="mv-home">
    <Layout title="Marvel Browser">
      <div className="mv-home__header">
        <h1>Marvel browser</h1>
      </div>
      <div className="mv-home__body">
        <div className="mv-home__sidebar">
          <HeroList style={{display: isRequestingMoreCharacters ? 'none' : 'block'}}>
            {characters.map((character) => (
              <HeroListItem
                key={`hero-list-key-${character.get('characterId')}`}
                onClick={() => requestMoreDetail(character.get('characterId'))}
                hasComics={character.get('hasComics')}
                imgSrc={character.get('imgSrc')}
                hasSeries={character.get('hasSeries')}
                hasEvents={character.get('hasEvents')}
                hasStories={character.get('hasStories')}
                name={character.get('name')}
              />
))}
          </HeroList>
        </div>
        <div className="mv-home__content">
          {characterDetailEl}
          <Loading isVisible={isRequestingCharacterDetail || isRequestingMoreCharacters} />
        </div>
      </div>
      <div className="mv-home__footer">
        <button type="button" onClick={() => requestMoreCharacters((+offset) - OFFSET_PAGE)}>BACK</button>
        <button type="button" onClick={() => requestMoreCharacters((+offset) + OFFSET_PAGE)}>NEXT</button>
      </div>
    </Layout>
  </section>
		);
	}
}

MarvelBrowser.propTypes = {
	offset: PropTypes.number,
	characterDetailId: PropTypes.number,
	characters: PropTypes.object,
	isRequestingMoreCharacters: PropTypes.bool,
	isRequestingCharacterDetail: PropTypes.bool,
	characterDetail: PropTypes.object,
};

const mapStateToProps = (state, props) => {
	const homeReducer = state.get('homeReducer');
	const getAppearSelector = makeGetAppearsSelector();
	return {
		offset: homeReducer.get('offset'),
		characters: getAppearSelector(state, props),
		characterDetail: homeReducer.get('characterDetail'),
		isRequestingMoreCharacters: homeReducer.get('isRequestingMoreCharacters'),
		characterDetailId: homeReducer.get('characterDetailId'),
		isRequestingCharacterDetail: homeReducer.get('isRequestingCharacterDetail')
	}
};

const mapDispatchToProps = (dispatch) => ({
	requestMoreCharacters: bindActionCreators(requestMoreCharacters, dispatch),
	requestMoreDetail: bindActionCreators(requestMoreDetail, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MarvelBrowser);
