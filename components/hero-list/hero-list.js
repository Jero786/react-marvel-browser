// Resources
import './hero-list.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';

function HeroList({children}) {
	return (
  <ul className="mv-hero-list">
    {children}
  </ul>
	);
}

HeroList.propTypes = {
	children: PropTypes.any,
};
HeroList.defaultProps = {};

export default memo(HeroList);
