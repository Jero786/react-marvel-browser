// Resources
import './hero-list-item.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function HeroListItem({
												onClick,
												name,
												imgSrc,
												hasComics,
												hasSeries,
												hasEvents,
												hasStories,
											}) {
	return (
  <li>
    <div
      className="mv-hero-list-item"
      role="button"
      tabIndex="0"
      onClick={onClick}
    >
      <div className="mv-hero-list-item__header">
        <img alt="related to some hero" src={imgSrc} />
      </div>
      <dl className="mv-hero-list-item__body">
        <dt className="mv-hero-list-item__label">Name:</dt>
        <dd className="mv-hero-list-item__value">{name}</dd>
        <dt className="mv-hero-list-item__label">HasComics:</dt>
        <dd className="mv-hero-list-item__value mv-comic">{String(hasComics)}</dd>
        <dt className="mv-hero-list-item__label">HasSeries:</dt>
        <dd className="mv-hero-list-item__value mv-series">{String(hasSeries)}</dd>
        <dt className="mv-hero-list-item__label">hasEvents:</dt>
        <dd className="mv-hero-list-item__value mv-events">{String(hasEvents)}</dd>
        <dt className="mv-hero-list-item__label">hasStories:</dt>
        <dd className="mv-hero-list-item__value mv-stories">{String(hasStories)}</dd>
      </dl>
    </div>
  </li>
	);
}

HeroListItem.propTypes = {
	onClick: PropTypes.func,
	imgSrc: PropTypes.string,
	name: PropTypes.string,
	hasComics: PropTypes.bool,
	hasSeries: PropTypes.bool,
	hasEvents: PropTypes.bool,
	hasStories: PropTypes.bool,
};

HeroListItem.defaultProps = {};

export default memo(HeroListItem);
