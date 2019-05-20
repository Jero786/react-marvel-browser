// Libs
import React from 'react'
import {render, cleanup} from 'react-testing-library'

// Components
import HeroDetail from 'components/hero-detail/hero-detail';

describe('HeroDetail', () => {

	afterEach(cleanup);

	it('should exist', () => {
		const {container} = render(<HeroDetail />);

		expect(container.firstChild.classList.contains('mv-hero-detail')).toBe(true)
	});

	it('should be able to change their visibility', () => {
		const {container} = render(<HeroDetail isVisible={false} />);

		expect(container.querySelector('.is-visible')).toBe(null);
	});

	it('should be able to define a biography', () => {
		render(<HeroDetail biography="my little brisa" />).getByText(/my little brisa/);
	});

	it('should be able to define a name', () => {
		render(<HeroDetail name="my little emi" />).getByText(/my little emi/);
	});

	it('should be able to define a name', () => {
		const {container, getByText} = render(<HeroDetail urls={[{url: 'some-link'}]} />);

		getByText(/some-link/);
		expect(container.querySelectorAll('.mv-hero-detail__urls li')).toHaveLength(1);
	});
});
