// Resources
import './loading.scss';

// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Loading({isVisible = true}) {
	return (
  <div className={classNames('mv-loading', {'is-display-none': !isVisible})}>
			Loading...
  </div>
	);
}

Loading.propTypes = {
	isVisible: PropTypes.bool,
};
Loading.defaultProps = {};

export default memo(Loading);
