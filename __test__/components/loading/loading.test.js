// Libs
import React from 'react'
import {render, cleanup} from 'react-testing-library'

// Components
import Loading from 'components/loading/loading';

describe('Loading', () => {

	afterEach(cleanup);

	it('should exist', () => {
		const {container} = render(<Loading />);

		expect(container.firstChild.classList.contains('mv-loading')).toBe(true)
	});

	it('should be able to be hidden', () => {
		const {container} = render(<Loading isVisible={false} />)
		expect(container.firstChild.classList.contains('is-display-none')).toBe(true)
	});

});
