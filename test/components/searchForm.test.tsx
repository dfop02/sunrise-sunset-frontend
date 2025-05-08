import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchForm from '../../src/app/components/SearchForm'

// Mock do Chart para evitar dependências visuais
jest.mock('../../src/app/components/Chart', () => () => <div data-testid="mock-chart">Chart</div>)

const mockResponse = [
  {
    city: 'São Paulo',
    date: '2025-05-08',
    sunrise: '2025-05-08 06:00:00 UTC',
    sunset: '2025-05-08 18:00:00 UTC',
    golden_hour: '2025-05-08 17:00:00 UTC',
  }
]

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  ) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('SearchForm', () => {
  it('performs fetch and shows Chart', async () => {
    render(<SearchForm />)

    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'Lisbon' },
    })

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2025-05-08' },
    })

    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2025-05-08' },
    })

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(screen.getByTestId('mock-chart')).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('city=Lisbon'),
      expect.objectContaining({
        headers: expect.objectContaining({
          BACKEND_API_KEY: expect.any(String),
        })
      })
    )
  })

  it('shows error message on failed fetch', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Something went wrong' }),
      })
    )

    render(<SearchForm />)

    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'Lisbon' },
    })

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2025-05-08' },
    })

    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2025-05-08' },
    })

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
