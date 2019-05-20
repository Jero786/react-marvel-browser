// Libs
import React from 'react'
import {render, cleanup, fireEvent} from 'react-testing-library'
import sinon from 'sinon';

// Components
import HeroListItem from 'components/hero-list/hero-list-item';

describe('HeroListItem', () => {

	afterEach(cleanup)

	it('should exist', () => {
		const {container} = render(<HeroListItem />)

		expect(container.querySelector('.mv-hero-list-item')).not.toBeNull();
	})

	it('should be able to have a custom name', () => {
		render(<HeroListItem name="brisa I love you" />).getByText(/brisa I love you/);
	});

	it('should be able to define if has a comic', () => {
		const {container} = render(<HeroListItem hasComics />);

		expect(container.querySelector('.mv-hero-list-item__value.mv-comic').innerHTML).toBe('true');
	});

	it('should be able to define if has a serie', () => {
		const {container} = render(<HeroListItem hasSeries />);

		expect(container.querySelector('.mv-hero-list-item__value.mv-series').innerHTML).toBe('true');
	});

	it('should be able to define if has a events', () => {
		const {container} = render(<HeroListItem hasEvents />);

		expect(container.querySelector('.mv-hero-list-item__value.mv-events').innerHTML).toBe('true');
	});

	it('should be able to define if has a stories', () => {
		const {container} = render(<HeroListItem hasStories />);

		expect(container.querySelector('.mv-hero-list-item__value.mv-stories').innerHTML).toBe('true');
	});

	it('should be able to handler click event', () => {
		const spy = sinon.spy();
		const {container} = render(<HeroListItem onClick={spy} />);

		fireEvent.click(container.querySelector('.mv-hero-list-item'));

		expect(spy.calledOnce).toBe(true);
	});
});
