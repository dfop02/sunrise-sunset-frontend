import { render, screen } from '@testing-library/react'
import Chart from '../../src/app/components/Chart'

const sampleData = [
  {
    city: 'Test City',
    date: '2025-05-08',
    sunrise: '2025-05-08 06:30:00 UTC',
    sunset: '2025-05-08 18:45:00 UTC',
    golden_hour: '2025-05-08 18:00:00 UTC',
  },
]

test('renders chart and table data correctly', () => {
  render(<Chart data={sampleData} />)

  expect(screen.getByText('2025-05-08')).toBeInTheDocument()
  expect(screen.getByText('2025-05-08 06:30:00 UTC')).toBeInTheDocument()
  expect(screen.getByText('2025-05-08 18:45:00 UTC')).toBeInTheDocument()
  expect(screen.getByText('2025-05-08 18:00:00 UTC')).toBeInTheDocument()
})
