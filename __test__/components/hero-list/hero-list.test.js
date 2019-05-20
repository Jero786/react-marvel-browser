// Libs
import React from 'react'
import {render, cleanup} from 'react-testing-library'

// Components
import HeroList from 'components/hero-list/hero-list';

describe('HeroList', () => {

  afterEach(cleanup)

  it('should exist', () => {
    const {container} = render(<HeroList />)

    expect(container.firstChild.classList.contains('mv-hero-list')).toBe(true)
  })

  it('should be able to receive children', () => {
		render(<HeroList><ul>SOME CHILDREN HERE</ul></HeroList>).getByText(/SOME CHILDREN HERE/);
  })

})
