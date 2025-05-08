import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

test('renders SearchForm in Home page', () => {
  render(<Home />)
  expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument()
})
