// Resources
import './hero-detail.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {map} from 'lodash/collection';

function HeroDetail({isVisible = true, name, imgSrc, biography, urls = []}) {

	return (
  <article className={classNames('mv-hero-detail', {'is-visible': isVisible})}>
    <h1 className="mv-hero-detail__name">{name}</h1>
    <img className="mv-hero-detail__image" src={imgSrc} alt={`super hero ${name} detail`} />
    <h2>Biography</h2>
    <p className="mv-hero-detail__biography">{biography}</p>
    <ul className="mv-hero-detail__urls">
      {map(urls, (url, index) => (
        <li key={`link-detail-key-${index}`}>
          <a rel="noopener noreferrer" target="_blank" href={url.url}>{url.url}</a>
        </li>
))}
    </ul>
  </article>
	);
}

HeroDetail.propTypes = {
	isVisible: PropTypes.bool,
	name: PropTypes.string,
	imgSrc: PropTypes.string,
	biography: PropTypes.string,
	urls: PropTypes.array,
};

HeroDetail.defaultProps = {};

export default memo(HeroDetail);
